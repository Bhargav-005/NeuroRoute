from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from datetime import datetime
from typing import Optional

class RequestLog(BaseModel):
    request_id: UUID = Field(default_factory=uuid4)
    prompt: str
    selected_provider: str
    latency_ms: int
    tokens_used: int
    actual_cost: float
    baseline_cost: float
    savings: float
    credits_earned: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

class RequestLogResponse(BaseModel):
    prompt: str
    provider: str
    latency: int
    savings: float
    credits: int
    timestamp: datetime
