from .classifier import classify_complexity
from .pii_scanner import scan_pii
from .scorer import calculate_provider_scores

async def run_routing_analysis(prompt: str) -> dict:
    """
    Pipeline logic: prompt → classifier → pii scanner → scorer → decision.
    If PII is detected, the provider is overridden to 'local_model' for security.
    """
    # 1. Complexity Classification
    complexity_info = classify_complexity(prompt)
    
    # 2. PII Detection
    pii_info = scan_pii(prompt)
    
    # 3. Provider Scoring
    scoring_info = calculate_provider_scores()
    
    # 4. Routing Decision (with PII override)
    selected_provider = scoring_info["selected"]
    if pii_info["pii_detected"]:
        selected_provider = "local_model"
        
    return {
        "complexity": complexity_info["complexity"],
        "pii_detected": pii_info["pii_detected"],
        "scores": scoring_info["scores"],
        "selected": selected_provider
    }
