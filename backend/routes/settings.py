from fastapi import APIRouter
from pydantic import BaseModel
from typing import Literal
from ..services.strategy_service import strategy_engine

router = APIRouter(prefix="/settings", tags=["settings"])

class StrategyRequest(BaseModel):
    strategy: Literal["cost", "balanced", "performance"]

class StrategyResponse(BaseModel):
    status: str
    strategy: str

@router.post("/strategy", response_model=StrategyResponse)
async def update_routing_strategy(request: StrategyRequest):
    """
    Updates the globally active routing strategy for the platform.
    This UI feedback will immediately reflect in all subsequent AI routing decisions.
    """
    new_strategy = strategy_engine.set_strategy(request.strategy)
    return StrategyResponse(status="updated", strategy=new_strategy)

@router.get("/strategy")
async def get_current_strategy():
    """Returns the currently active platform routing strategy."""
    return {"strategy": strategy_engine.get_current_strategy()}
