from pydantic import BaseModel
from datetime import datetime
from typing import Literal

class ProviderHealth(BaseModel):
    provider_name: str
    health_status: Literal["healthy", "degraded", "down"]
    latency_ms: int
    last_checked: datetime

class ProviderResponse(BaseModel):
    provider: str
    health: str
    latency: int
