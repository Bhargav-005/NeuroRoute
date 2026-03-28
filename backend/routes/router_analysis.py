from fastapi import APIRouter
from pydantic import BaseModel
from ..intelligence.router_service import run_routing_analysis

router = APIRouter(prefix="/route", tags=["routing"])

class AnalysisRequest(BaseModel):
    prompt: str

class AnalysisResponse(BaseModel):
    complexity: str
    pii_detected: bool
    scores: dict
    selected: str

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_prompt_routing(request: AnalysisRequest):
    """
    Returns routing intelligence and provider suggestions based on prompt analysis.
    Powers the 'Router Page (Brain of System)' on the NeuroRoute platform.
    """
    return await run_routing_analysis(request.prompt)
