import random
import asyncio
from datetime import datetime
from typing import Dict, Any

# Safe import for logging if it exists
try:
    from .engine import RequestLoggerService
    LOGGER_AVAILABLE = True
except ImportError:
    LOGGER_AVAILABLE = False

class ChatExecutionEngine:
    @staticmethod
    async def execute_completion(prompt: str) -> Dict[str, Any]:
        """
        Executes a simulated AI completion with intelligent routing.
        Logic: Selects provider based on prompt length, calculates savings and credits.
        """
        prompt_len = len(prompt)
        
        # 1. Provider Selection Logic
        if prompt_len < 50:
            selected_provider = "gemini-flash"
        elif 50 <= prompt_len < 200:
            selected_provider = "gpt-4o-mini"
        else:
            selected_provider = "gpt-4o"

        # 2. Simulate Latency (80ms to 400ms)
        latency = random.randint(80, 400)
        await asyncio.sleep(latency / 1000) # Non-blocking sleep

        # 3. Cost + Savings Calculation
        baseline_cost = 0.005  # GPT-4o fixed baseline
        actual_cost = round(random.uniform(0.0001, 0.003), 6)
        savings = max(0, round(baseline_cost - actual_cost, 6))
        credits_earned = int(savings * 100000)

        # 4. Generate Mock Response
        response_text = f"This is an intelligent AI response from {selected_provider.upper()}. " \
                        f"NeuroRoute optimized this request, saving ${savings} and earning {credits_earned} credits."

        # 5. Log request safely if logger is available
        if LOGGER_AVAILABLE:
            try:
                # Standardizing token count simulation
                tokens = prompt_len // 4 + 50 
                await RequestLoggerService.log_request(
                    prompt=prompt,
                    provider=selected_provider,
                    tokens_used=tokens,
                    latency=latency,
                    baseline_cost=baseline_cost,
                    actual_cost=actual_cost
                )
            except Exception as e:
                print(f"Logging failed but skipping crash: {e}")

        return {
            "choices": [
                {
                    "message": {
                        "role": "assistant",
                        "content": response_text
                    }
                }
            ],
            "meta": {
                "provider": selected_provider,
                "latency": latency,
                "savings": savings,
                "credits": credits_earned,
                "timestamp": datetime.utcnow().isoformat()
            }
        }
