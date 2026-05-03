from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

# User Schemas
class UserCreate(BaseModel):
    email: EmailStr
    name: str
    picture_url: Optional[str] = None
    google_id: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    picture_url: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Auth Schemas
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class GoogleTokenRequest(BaseModel):
    token: str

# Wallet Schemas
class WalletResponse(BaseModel):
    id: str
    user_id: str
    credits: int
    total_savings_usd: float
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Request Log Schemas
class RequestLogCreate(BaseModel):
    prompt: str
    selected_provider: str
    latency_ms: int
    tokens_used: int
    actual_cost: float
    baseline_cost: float

class RequestLogResponse(BaseModel):
    id: str
    user_id: str
    prompt: str
    selected_provider: str
    latency_ms: int
    tokens_used: int
    actual_cost: float
    baseline_cost: float
    savings: float
    credits_earned: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Transaction Schemas
class TransactionResponse(BaseModel):
    id: str
    user_id: str
    type: str
    amount: int
    description: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Provider Schemas
class ProviderHealthResponse(BaseModel):
    provider_name: str
    health_status: str
    latency_ms: int
    last_checked: datetime
    
    class Config:
        from_attributes = True

# Analytics Schemas
class AnalyticsSummary(BaseModel):
    total_requests: int
    avg_latency: float
    total_savings: float
    total_credits: int
    routing_efficiency: float
