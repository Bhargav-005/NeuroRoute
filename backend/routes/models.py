from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any
from ..services.models_service import ModelsService

router = APIRouter(prefix="/v1", tags=["models"])

class ModelsResponse(BaseModel):
    data: List[Dict[str, Any]]

@router.get("/models", response_model=ModelsResponse)
async def get_models():
    """Returns a dynamic list of all available AI models for the Models Page."""
    return ModelsResponse(data=ModelsService.get_available_models())
