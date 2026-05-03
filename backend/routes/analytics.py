from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.db_models import User
from ..services.auth import get_current_user_db
from ..services.db_service import RequestLogService, ProviderHealthService
from ..schemas import RequestLogResponse, ProviderHealthResponse

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/summary")
async def get_summary(
    current_user: User = Depends(get_current_user_db),
    db: Session = Depends(get_db)
):
    """Returns aggregated metrics for the dashboard summary cards."""
    analytics = RequestLogService.get_analytics(db, current_user.id)
    return analytics

@router.get("/requests", response_model=List[RequestLogResponse])
async def get_recent_requests(
    current_user: User = Depends(get_current_user_db),
    db: Session = Depends(get_db),
    limit: int = 20
):
    """Returns the last 20 AI routing request logs for the user."""
    requests = RequestLogService.get_user_requests(db, current_user.id, limit=limit)
    return requests

@router.get("/providers", response_model=List[ProviderHealthResponse])
async def get_provider_status(db: Session = Depends(get_db)):
    """Returns the health and latency of available AI providers."""
    providers = ProviderHealthService.get_all_providers(db)
    return providers

