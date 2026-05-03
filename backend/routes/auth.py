from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas import GoogleTokenRequest, TokenResponse, UserResponse
from ..services.auth import AuthService, get_current_user, get_current_user_db
from ..models.db_models import User

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/google-signin", response_model=TokenResponse)
async def google_signin(request: GoogleTokenRequest, db: Session = Depends(get_db)):
    """
    Handle Google OAuth2 sign-in
    
    Args:
        request: Contains Google OAuth2 token
        db: Database session
    
    Returns:
        TokenResponse with JWT access token and user info
    """
    # Verify Google token
    google_user_info = await AuthService.verify_google_token(request.token)
    
    # Get or create user
    user = await AuthService.get_or_create_user(db, google_user_info)
    
    # Create JWT token
    access_token = AuthService.create_access_token(data={"sub": user.id})
    
    return TokenResponse(
        access_token=access_token,
        user=UserResponse.model_validate(user)
    )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user_db)):
    """Get current authenticated user info"""
    return UserResponse.model_validate(current_user)

@router.post("/logout")
async def logout(current_user: User = Depends(get_current_user_db)):
    """
    Logout endpoint (mainly for frontend to know logout was successful)
    Actual token invalidation should be handled on frontend by removing token
    """
    return {"message": "Logged out successfully", "user_id": current_user.id}
