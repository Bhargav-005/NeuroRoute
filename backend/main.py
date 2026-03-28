import uvicorn
import random
import asyncio
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .routes import analytics, wallet, router_analysis, chat, models, settings
from .services.engine import ProviderService, RequestLoggerService
from .utils.simulation import seed_initial_data

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: seed some data
    await seed_initial_data()
    # Start background task for health updates
    task = asyncio.create_task(ProviderService.update_health_periodically())
    yield
    # Shutdown: cancel background task
    task.cancel()

app = FastAPI(
    title="NeuroRoute Backend Engine",
    description="Real-time AI Routing Analytics and Monitoring API",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include modules
app.include_router(analytics.router)
app.include_router(wallet.router)
app.include_router(router_analysis.router)
app.include_router(chat.router)
app.include_router(models.router)
app.include_router(settings.router)

@app.get("/")
async def root():
    return {
        "status": "online",
        "api": "NeuroRoute Engine",
        "health": "healthy"
    }

# Bonus: Simulation endpoint to trigger a request
@app.post("/simulate/request")
async def simulate_request(background_tasks: BackgroundTasks):
    """Simulates a single AI routing request to update live charts on dashboard."""
    providers = ["OpenAI GPT-4o", "Anthropic Claude 3.5 Sonnet", "Google Gemini 1.5 Pro", "Mistral Large"]
    prompts = ["Can you help me debug this code?", "Explain the benefits of NeuroRoute.", "Show me current market trends for AI tokens."]
    
    provider = random.choice(providers)
    prompt = random.choice(prompts)
    latency = random.randint(300, 1100)
    tokens = random.randint(100, 500)
    baseline_cost = 0.04  # standard GPT-4o cost for 1k tokens
    actual_cost = round(random.uniform(0.002, 0.015), 4) if provider != "OpenAI GPT-4o" else baseline_cost
    
    background_tasks.add_task(
        RequestLoggerService.log_request,
        prompt=prompt,
        provider=provider,
        tokens_used=tokens,
        latency=latency,
        baseline_cost=baseline_cost,
        actual_cost=actual_cost
    )
    
    return {"message": "Request simulated successfully", "provider": provider}

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
