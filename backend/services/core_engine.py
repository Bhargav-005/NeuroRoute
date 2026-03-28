import random
import asyncio
from datetime import datetime
from typing import Dict, Any

# Safe Imports (Graceful Fallbacks if missing/incomplete)
try:
    from ..intelligence.classifier import classify_complexity
    from ..intelligence.pii_scanner import scan_pii
    from ..intelligence.scorer import MOCK_PROVIDERS, WEIGHTS # Base data
    INTELLIGENCE_READY = True
except ImportError:
    INTELLIGENCE_READY = False

try:
    from ..economy.credits_service import credits_service
    ECONOMY_READY = True
except ImportError:
    ECONOMY_READY = False

try:
    from .strategy_service import strategy_engine
    STRATEGY_READY = True
except ImportError:
    STRATEGY_READY = False

try:
    from .engine import RequestLoggerService
    LOGGER_READY = True
except ImportError:
    LOGGER_READY = False

class CoreExecutionEngine:
    @staticmethod
    async def process_intent(prompt: str) -> Dict[str, Any]:
        """
        The Orchestrator: full intelligent routing pipeline.
        Execution Flow: Classifier → PII Scan → Routing Scorer → Provider Execution → Results.
        """
        # 1. Complexity Classification
        complexity = "medium"
        if INTELLIGENCE_READY:
            complexity = classify_complexity(prompt)["complexity"]
            
        # 2. PII Integrity Scan
        pii_detected = False
        if INTELLIGENCE_READY:
            pii_detected = scan_pii(prompt)["pii_detected"]
            
        # 3. Dynamic Routing Weighting (Strategy Interface)
        weights = {"cost": 0.35, "latency": 0.35, "quality": 0.3}
        strategy_name = "balanced"
        if STRATEGY_READY:
            weights = strategy_engine.get_weights()
            strategy_name = strategy_engine.get_current_strategy()
            
        # 4. Routing Scorer & Provider Selection
        scores = {}
        providers = MOCK_PROVIDERS if INTELLIGENCE_READY else {
            "openai": {"cost": 0.9, "latency": 0.6, "quality": 1.0},
            "gemini": {"cost": 0.3, "latency": 0.8, "quality": 0.7}
        }
        
        for p, stats in providers.items():
            # Scoring: weighted suitability
            score = (weights["cost"] * (1.0 - stats["cost"]) + 
                     weights["latency"] * (1.0 - stats["latency"]) + 
                     weights["quality"] * stats["quality"])
            scores[p] = round(score, 4)
            
        selected_provider = max(scores, key=scores.get)
        
        # PII Override logic
        if pii_detected:
            selected_provider = "local_model"
            
        # 5. Simulated Response & Latency
        latency = random.randint(80, 400)
        await asyncio.sleep(latency / 1000)
        response_text = f"AI routed via {selected_provider.upper()}. Analyzing prompt for {complexity} intent."
        
        # 6. Cost + Credit Processing
        baseline_cost = 0.005 # Ref constant
        actual_cost = round(random.uniform(0.0001, 0.003), 6)
        if selected_provider == "openai": actual_cost = baseline_cost
        
        savings = 0.0
        credits_earned = 0
        if ECONOMY_READY:
            reward_data = credits_service.calculate_and_save(actual_cost)
            savings = reward_data["savings"]
            credits_earned = reward_data["credits"]
            
        # 7. Safe Logging (Optional Tracking)
        if LOGGER_READY:
            try:
                tokens = len(prompt) // 4 + 20
                await RequestLoggerService.log_request(
                    prompt=prompt,
                    provider=selected_provider,
                    tokens_used=tokens,
                    latency=latency,
                    baseline_cost=baseline_cost,
                    actual_cost=actual_cost
                )
            except: pass # Isolated logging error handling
            
        # Final Dashboard-Ready Payload
        return {
            "choices": [{"message": {"role": "assistant", "content": response_text}}],
            "meta": {
                "provider": selected_provider,
                "latency": latency,
                "savings": round(savings, 6),
                "credits": credits_earned,
                "strategy": strategy_name,
                "pii_detected": pii_detected,
                "complexity": complexity
            }
        }

# Core singleton to maintain execution context
core_engine = CoreExecutionEngine()
