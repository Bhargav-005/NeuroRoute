from fastapi import APIRouter
from typing import List
from ..services.engine import MetricsService, storage, ProviderService
from ..services.analytics_service import AnalyticsService
from ..models.request_log import RequestLogResponse
from ..models.provider import ProviderResponse

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/summary")
async def get_summary():
    """Returns aggregated metrics for the dashboard summary cards and Analytics page."""
    return AnalyticsService.get_summary()

@router.get("/history")
async def get_history():
    """Returns historical trend data for charts on the Analytics page."""
    return AnalyticsService.get_history()

@router.get("/requests", response_model=List[RequestLogResponse])
async def get_recent_requests():
    """Returns the last 20 AI routing request logs."""
    # Getting latest 20 requests
    sorted_reqs = sorted(storage.requests, key=lambda x: x.created_at, reverse=True)[:20]
    
    return [
        RequestLogResponse(
            prompt=r.prompt,
            provider=r.selected_provider,
            latency=r.latency_ms,
            savings=round(r.savings, 4),
            credits=r.credits_earned,
            timestamp=r.created_at
        ) for r in sorted_reqs
    ]

@router.get("/providers", response_model=List[ProviderResponse])
async def get_provider_status():
    """Returns the health and latency of available AI providers."""
    return ProviderService.get_providers()
