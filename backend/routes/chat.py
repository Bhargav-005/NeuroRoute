from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict
from ..services.core_engine import core_engine

router = APIRouter(prefix="/v1", tags=["chat"])

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatCompletionRequest(BaseModel):
    messages: List[ChatMessage]

@router.post("/chat/completions")
async def chat_completions(request: ChatCompletionRequest):
    """
    Simulates a chat completion with AI routing intelligence.
    Returns: AI response, provider selected, latency, savings, and credits earned.
    This endpoint powers the NeuroRoute Playground.
    """
    # Extracting the last user prompt
    user_prompt = ""
    for msg in reversed(request.messages):
        if msg.role == "user":
            user_prompt = msg.content
            break
            
    if not user_prompt:
        user_prompt = "Quick help"

    return await core_engine.process_intent(user_prompt)
