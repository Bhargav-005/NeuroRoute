import random
import asyncio
from datetime import datetime
from uuid import uuid4
from typing import List, Dict
from ..models.request_log import RequestLog
from ..models.provider import ProviderHealth

# In-Memory Database (Singleton for demo)
class Storage:
    requests: List[RequestLog] = []
    providers: Dict[str, ProviderHealth] = {
        "OpenAI GPT-4o": ProviderHealth(provider_name="OpenAI GPT-4o", health_status="healthy", latency_ms=450, last_checked=datetime.utcnow()),
        "Anthropic Claude 3.5 Sonnet": ProviderHealth(provider_name="Anthropic Claude 3.5 Sonnet", health_status="healthy", latency_ms=380, last_checked=datetime.utcnow()),
        "Google Gemini 1.5 Pro": ProviderHealth(provider_name="Google Gemini 1.5 Pro", health_status="degraded", latency_ms=1200, last_checked=datetime.utcnow()),
        "Mistral Large": ProviderHealth(provider_name="Mistral Large", health_status="healthy", latency_ms=520, last_checked=datetime.utcnow()),
    }
    wallet = {
        "credits": 250000,
        "total_savings_usd": 128.45,
        "recent_transactions": [
            {"id": "tx_123", "type": "credit_earned", "amount": 450, "description": "Routing to Gemini-Flash", "timestamp": str(datetime.utcnow())},
            {"id": "tx_122", "type": "usage", "amount": -12, "description": "LLM Inference Claude 3.5", "timestamp": str(datetime.utcnow())}
        ]
    }

storage = Storage()

class RequestLoggerService:
    @staticmethod
    async def log_request(prompt: str, provider: str, tokens_used: int, latency: int, baseline_cost: float, actual_cost: float):
        savings = baseline_cost - actual_cost
        credits_earned = int(savings * 100000)
        
        request = RequestLog(
            prompt=prompt,
            selected_provider=provider,
            latency_ms=latency,
            tokens_used=tokens_used,
            actual_cost=actual_cost,
            baseline_cost=baseline_cost,
            savings=savings,
            credits_earned=credits_earned,
            created_at=datetime.utcnow()
        )
        storage.requests.append(request)
        
        # Update wallet
        storage.wallet["credits"] += credits_earned
        storage.wallet["total_savings_usd"] += savings
        
        # Add to transactions
        storage.wallet["recent_transactions"].insert(0, {
            "id": f"tx_{str(uuid4())[:8]}",
            "type": "savings_credit",
            "amount": credits_earned,
            "description": f"Savings from routing to {provider}",
            "timestamp": str(datetime.utcnow())
        })
        storage.wallet["recent_transactions"] = storage.wallet["recent_transactions"][:5]

class MetricsService:
    @staticmethod
    def get_summary():
        total_reqs = len(storage.requests)
        if total_reqs == 0:
            return {
                "total_requests": 0,
                "avg_latency": 0.0,
                "total_savings": 0.0,
                "total_credits": storage.wallet["credits"],
                "routing_efficiency": 0.0
            }
            
        avg_latency = sum(r.latency_ms for r in storage.requests) / total_reqs
        total_savings = sum(r.savings for r in storage.requests)
        
        # Simulated efficiency: optimized if selected provider != most expensive OpenAI GPT-4o
        optimized_requests = sum(1 for r in storage.requests if r.selected_provider != "OpenAI GPT-4o")
        efficiency = (optimized_requests / total_reqs) * 100 if total_reqs > 0 else 0
        
        return {
            "total_requests": total_reqs,
            "avg_latency": round(avg_latency, 2),
            "total_savings": round(total_savings, 2),
            "total_credits": storage.wallet["credits"],
            "routing_efficiency": round(efficiency, 1)
        }

class ProviderService:
    @staticmethod
    async def update_health_periodically():
        while True:
            for name in storage.providers.keys():
                # Randomize health status
                status = random.choice(["healthy", "healthy", "healthy", "degraded", "down"])
                # OpenAI and Claude are more stable in this simulation
                if "OpenAI" in name or "Anthropic" in name:
                    status = random.choice(["healthy", "healthy", "degraded"])
                
                # Randomize latency
                latency = random.randint(200, 800)
                if status == "degraded": latency = random.randint(1500, 3000)
                if status == "down": latency = 0
                
                storage.providers[name].health_status = status
                storage.providers[name].latency_ms = latency
                storage.providers[name].last_checked = datetime.utcnow()
                
            await asyncio.sleep(8) # Update every 8 seconds

    @staticmethod
    def get_providers():
        return [
            {
                "provider": p.provider_name,
                "health": p.health_status,
                "latency": p.latency_ms
            } for p in storage.providers.values()
        ]
