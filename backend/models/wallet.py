from pydantic import BaseModel
from typing import List, Dict, Any

class Transaction(BaseModel):
    id: str
    type: str
    amount: float
    description: str
    timestamp: str

class WalletBalance(BaseModel):
    credits: int
    total_saved_usd: float
    recent_transactions: List[Dict[str, Any]]

class AnalyticsSummary(BaseModel):
    total_requests: int
    avg_latency: float
    total_savings: float
    total_credits: int
    routing_efficiency: float
