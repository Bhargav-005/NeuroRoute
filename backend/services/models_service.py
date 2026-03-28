import random
from typing import List, Dict, Any

class ModelsService:
    @staticmethod
    def get_available_models() -> List[Dict[str, Any]]:
        """
        Returns a list of all supported AI models with their associated cost, 
        latency, quality, and real-time health status.
        Uses randomized latency/health for a dynamic 'live' feel on the Models Page.
        """
        base_models = [
            {"id": "gpt-4o", "provider": "openai", "cost": 5.00, "latency": 120, "quality": 0.98, "health": "healthy"},
            {"id": "claude-3.5-sonnet", "provider": "anthropic", "cost": 3.00, "latency": 145, "quality": 0.96, "health": "healthy"},
            {"id": "llama-70b", "provider": "meta", "cost": 0.10, "latency": 85, "quality": 0.92, "health": "healthy"},
            {"id": "gemini-1.5-pro", "provider": "google", "cost": 7.00, "latency": 180, "quality": 0.94, "health": "healthy"},
            {"id": "gpt-4o-mini", "provider": "openai", "cost": 0.15, "latency": 50, "quality": 0.88, "health": "healthy"},
            {"id": "mistral-large", "provider": "mistral", "cost": 2.00, "latency": 130, "quality": 0.95, "health": "healthy"}
        ]
        
        # Randomize health to simulate real-time monitoring
        degraded_index = random.randint(0, len(base_models) - 1)
        
        processed_data = []
        for i, model in enumerate(base_models):
            # Slight latency jitter (+/- 10ms)
            latency_jitter = random.randint(-10, 10)
            
            # Simulated health status change
            health = model["health"]
            if i == degraded_index:
                health = "degraded"
            
            processed_model = model.copy()
            processed_model["latency"] = max(1, model["latency"] + latency_jitter)
            processed_model["health"] = health
            
            processed_data.append(processed_model)
            
        return processed_data
