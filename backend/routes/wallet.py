from fastapi import APIRouter
from typing import List, Dict, Any
from ..models.wallet import WalletBalance # Added handling for this if missing
from ..economy.credits_service import credits_service

# Handle missing model if not setup correctly in dev environment
try:
    from ..models.wallet import WalletBalance
except ImportError:
    class WalletBalance: pass # Minimal fallback

router = APIRouter(prefix="/wallet", tags=["wallet"])

@router.get("/balance")
async def get_balance():
    """Returns real-time wallet balance and total savings from the Economy Engine."""
    return credits_service.get_balance()

@router.get("/history", response_model=List[Dict[str, Any]])
async def get_reward_history():
    """Returns the last 10 historical reward and credit transactions."""
    return credits_service.get_history()
