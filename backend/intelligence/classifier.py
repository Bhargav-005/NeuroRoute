def classify_complexity(prompt: str) -> dict:
    """
    Classifies the complexity of a prompt based on its length.
    Rules:
    - length < 50 → 'simple'
    - length 50–150 → 'medium'
    - length 150–300 → 'complex'
    - length > 300 → 'expert'
    """
    length = len(prompt)
    
    if length < 50:
        complexity = "simple"
        score = 20
    elif 50 <= length < 150:
        complexity = "medium"
        score = 45
    elif 150 <= length < 300:
        complexity = "complex"
        score = 75
    else:
        complexity = "expert"
        score = 95
        
    return {
        "complexity": complexity,
        "score": score
    }
