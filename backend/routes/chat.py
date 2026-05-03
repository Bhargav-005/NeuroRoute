from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Dict
from sqlalchemy.orm import Session

from ..services.core_engine import core_engine
from ..models.db_models import User
from ..services.auth import get_current_user_db
from ..database import get_db
from ..services.db_service import RequestLogService

router = APIRouter(prefix="/v1", tags=["chat"])

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatCompletionRequest(BaseModel):
    messages: List[ChatMessage]

@router.post("/chat/completions")
async def chat_completions(
    request: ChatCompletionRequest,
    current_user: User = Depends(get_current_user_db),
    db: Session = Depends(get_db)
):
    """
    Simulates a chat completion with AI routing intelligence.
    Returns: AI response, provider selected, latency, savings, and credits earned.
    This endpoint powers the NeuroRoute Playground and logs to database.
    """
    # Extracting the last user prompt
    user_prompt = ""
    for msg in reversed(request.messages):
        if msg.role == "user":
            user_prompt = msg.content
            break
            
    if not user_prompt:
        user_prompt = "Quick help"

    result = await core_engine.process_intent(user_prompt)
    
    # Log the request to database
    await RequestLogService.log_request(
        db=db,
        user_id=current_user.id,
        prompt=user_prompt,
        provider=result.get("selected_provider", "Unknown"),
        tokens_used=result.get("tokens_used", 0),
        latency=result.get("latency", 0),
        baseline_cost=result.get("baseline_cost", 0.0),
        actual_cost=result.get("actual_cost", 0.0)
    )
    
    return result

