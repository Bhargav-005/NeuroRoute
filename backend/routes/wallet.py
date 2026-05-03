from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.db_models import User
from ..services.auth import get_current_user_db
from ..services.db_service import WalletService

router = APIRouter(prefix="/wallet", tags=["wallet"])

@router.get("/balance")
async def get_balance(
    current_user: User = Depends(get_current_user_db),
    db: Session = Depends(get_db)
):
    """Returns real-time wallet balance and total savings."""
    wallet = WalletService.get_wallet(db, current_user.id)
    if not wallet:
        return {"credits": 0, "total_savings_usd": 0.0}
    
    return {
        "credits": wallet.credits,
        "total_savings_usd": wallet.total_savings_usd,
        "user_id": current_user.id
    }

@router.get("/history", response_model=List[Dict[str, Any]])
async def get_reward_history(
    current_user: User = Depends(get_current_user_db),
    db: Session = Depends(get_db)
):
    """Returns the last 10 historical reward and credit transactions."""
    transactions = WalletService.get_recent_transactions(db, current_user.id, limit=10)
    
    return [
        {
            "id": t.id,
            "type": t.type,
            "amount": t.amount,
            "description": t.description,
            "timestamp": t.created_at.isoformat()
        }
        for t in transactions
    ]
