import random
from uuid import uuid4
from datetime import datetime, timedelta
from ..services.engine import storage, RequestLog

async def seed_initial_data():
    providers = ["OpenAI GPT-4o", "Anthropic Claude 3.5 Sonnet", "Google Gemini 1.5 Pro", "Mistral Large"]
    prompts = [
        "What is the capital of France?",
        "Generate a React component for a dashboard sidebar.",
        "How do I use FastAPI background tasks?",
        "Write a poem about quantum computing.",
        "Explain backpropagation in deep learning.",
        "Optimize this SQL query for better performance.",
        "Translate 'Hello world' to Japanese.",
        "Create a unit test for this Python function."
    ]
    
    # Seeding 15 requests
    for i in range(15):
        provider = random.choice(providers)
        prompt = random.choice(prompts)
        latency = random.randint(250, 950)
        tokens = random.randint(50, 1500)
        baseline_cost = round(random.uniform(0.01, 0.05), 4)
        actual_cost = round(random.uniform(0.005, 0.015), 4) if provider != "OpenAI GPT-4o" else baseline_cost
        savings = baseline_cost - actual_cost
        credits_earned = int(savings * 100000)
        
        request = RequestLog(
            request_id=uuid4(),
            prompt=prompt,
            selected_provider=provider,
            latency_ms=latency,
            tokens_used=tokens,
            actual_cost=actual_cost,
            baseline_cost=baseline_cost,
            savings=savings,
            credits_earned=credits_earned,
            created_at=datetime.utcnow() - timedelta(minutes=random.randint(5, 120))
        )
        storage.requests.append(request)
        
    storage.requests.sort(key=lambda x: x.created_at, reverse=True)
