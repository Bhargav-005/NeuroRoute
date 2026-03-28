# Provider-specific characteristics (0.0 - 1.0)
MOCK_PROVIDERS = {
    "openai": {"cost": 0.9, "latency": 0.6, "quality": 1.0},
    "gemini": {"cost": 0.3, "latency": 0.8, "quality": 0.7},
    "anthropic": {"cost": 0.6, "latency": 0.7, "quality": 0.95}
}

WEIGHTS = {
    "cost": 0.35,
    "latency": 0.35,
    "quality": 0.30
}

def calculate_provider_scores() -> dict:
    """
    Computes routing scores per provider using weighted logic.
    Scores represent normalized efficiency/suitability (higher is better).
    For cost and latency, lower is 'better' in real life, but these mock scores 
    represent 'goodness' (e.g. 0.3 cost means it's cheap/good).
    """
    scores = {}
    
    for provider, stats in MOCK_PROVIDERS.items():
        # Score = (w1 * cost_goodness) + (w2 * latency_goodness) + (w3 * quality)
        score = (
            WEIGHTS["cost"] * (1.0 - stats["cost"]) + 
            WEIGHTS["latency"] * (1.0 - stats["latency"]) + 
            WEIGHTS["quality"] * stats["quality"]
        )
        scores[provider] = round(score, 4)
        
    best_provider = max(scores, key=scores.get)
    
    return {
        "scores": scores,
        "selected": best_provider
    }
