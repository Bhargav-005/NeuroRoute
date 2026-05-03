import os
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from sqlalchemy.orm import Session
from google.auth.transport import requests
from google.oauth2 import id_token
import logging

from ..database import get_db
from ..models.db_models import User, Wallet
from ..schemas import UserResponse, TokenResponse

logger = logging.getLogger(__name__)

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production-with-env")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 24  # 30 days

# Google OAuth Configuration
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")

security = HTTPBearer()

class AuthService:
    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    
    @staticmethod
    def decode_token(token: str):
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id = payload.get("sub")
            if user_id is None:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
            return user_id
        except JWTError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
    @staticmethod
    async def verify_google_token(token: str):
        """Verify Google OAuth2 token and extract user info"""
        try:
            # Verify the token with Google
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
            
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')
            
            return {
                'google_id': idinfo['sub'],
                'email': idinfo['email'],
                'name': idinfo.get('name', 'User'),
                'picture_url': idinfo.get('picture', None)
            }
        except Exception as e:
            logger.error(f"Google token verification failed: {str(e)}")
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Google token")
    
    @staticmethod
    async def get_or_create_user(db: Session, google_user_info: dict):
        """Get existing user or create new one"""
        # Check if user exists by email
        user = db.query(User).filter(User.email == google_user_info['email']).first()
        
        if not user:
            # Create new user
            user = User(
                google_id=google_user_info['google_id'],
                email=google_user_info['email'],
                name=google_user_info['name'],
                picture_url=google_user_info.get('picture_url')
            )
            db.add(user)
            db.flush()  # Flush to get the ID without committing
            
            # Create wallet for user
            wallet = Wallet(user_id=user.id)
            db.add(wallet)
            db.commit()
        else:
            # Update user info if they previously signed in differently
            user.google_id = google_user_info['google_id']
            user.picture_url = google_user_info.get('picture_url', user.picture_url)
            db.commit()
        
        return user

async def get_current_user(
    credentials: HTTPAuthCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> UserResponse:
    """Get current authenticated user from JWT token"""
    token = credentials.credentials
    user_id = AuthService.decode_token(token)
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    
    return UserResponse.model_validate(user)

async def get_current_user_db(
    credentials: HTTPAuthCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """Get current authenticated user object from database"""
    token = credentials.credentials
    user_id = AuthService.decode_token(token)
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    
    return user
