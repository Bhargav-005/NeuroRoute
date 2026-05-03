import uvicorn
import random
import asyncio
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv
import os

from .database import engine, get_db, Base
from .models.db_models import User, Wallet, RequestLog, Transaction, ProviderHealth
from .routes import analytics, wallet, router_analysis, chat, models, settings, auth
from .services.auth import AuthService
from .services.db_service import ProviderHealthService, seed_initial_data

# Load environment variables
load_dotenv()

# Create all database tables
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize database with demo user and seed data
    db = next(get_db())
    try:
        # Check if demo user exists
        from sqlalchemy.orm import Session
        demo_user = db.query(User).filter(User.email == "demo@neurouteai.com").first()
        
        if not demo_user:
            # Create demo user for testing
            demo_user = User(
                email="demo@neurouteai.com",
                name="Demo User",
                is_active=True
            )
            db.add(demo_user)
            db.flush()
            
            # Create wallet for demo user
            wallet = Wallet(user_id=demo_user.id)
            db.add(wallet)
            db.commit()
        
        # Seed initial request data for demo user if empty
        request_count = db.query(RequestLog).filter(
            RequestLog.user_id == demo_user.id
        ).count()
        
        if request_count == 0:
            await seed_initial_data(db, demo_user.id)
        
        # Initialize provider health data
        providers = ["OpenAI GPT-4o", "Anthropic Claude 3.5 Sonnet", "Google Gemini 1.5 Pro", "Mistral Large"]
        for provider in providers:
            existing = db.query(ProviderHealth).filter(
                ProviderHealth.provider_name == provider
            ).first()
            
            if not existing:
                ProviderHealthService.update_provider_health(
                    db=db,
                    provider_name=provider,
                    health_status="healthy",
                    latency_ms=random.randint(300, 800)
                )
    finally:
        db.close()
    
    # Start background task for health updates
    task = asyncio.create_task(periodic_health_update())
    yield
    # Shutdown: cancel background task
    task.cancel()

async def periodic_health_update():
    """Background task to periodically update provider health"""
    db = next(get_db())
    try:
        providers = ["OpenAI GPT-4o", "Anthropic Claude 3.5 Sonnet", "Google Gemini 1.5 Pro", "Mistral Large"]
        
        while True:
            try:
                for provider in providers:
                    health_status = random.choice(["healthy", "degraded", "healthy", "healthy"])
                    latency = random.randint(300, 1200)
                    ProviderHealthService.update_provider_health(db, provider, health_status, latency)
                
                await asyncio.sleep(10)  # Update every 10 seconds
            except Exception as e:
                print(f"Error updating provider health: {str(e)}")
                await asyncio.sleep(10)
    finally:
        db.close()

app = FastAPI(
    title="NeuroRoute Backend Engine",
    description="Real-time AI Routing Analytics and Monitoring API",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include modules
app.include_router(auth.router)
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
        "health": "healthy",
        "database": "postgresql",
        "authentication": "Google OAuth2 + JWT"
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
    baseline_cost = 0.04
    actual_cost = round(random.uniform(0.002, 0.015), 4) if provider != "OpenAI GPT-4o" else baseline_cost
    
    return {"message": "Request simulated successfully", "provider": provider}

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
