from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from uuid import uuid4
import random
from typing import List, Dict, Any

from ..models.db_models import RequestLog, Wallet, Transaction, User, ProviderHealth
from ..schemas import RequestLogResponse, TransactionResponse

class RequestLogService:
    @staticmethod
    async def log_request(
        db: Session,
        user_id: str,
        prompt: str,
        provider: str,
        tokens_used: int,
        latency: int,
        baseline_cost: float,
        actual_cost: float
    ) -> RequestLogResponse:
        """Log a request and update wallet/transactions"""
        savings = baseline_cost - actual_cost
        credits_earned = int(savings * 100000)
        
        # Create request log
        request_log = RequestLog(
            user_id=user_id,
            prompt=prompt,
            selected_provider=provider,
            latency_ms=latency,
            tokens_used=tokens_used,
            actual_cost=actual_cost,
            baseline_cost=baseline_cost,
            savings=savings,
            credits_earned=credits_earned
        )
        db.add(request_log)
        
        # Update wallet
        wallet = db.query(Wallet).filter(Wallet.user_id == user_id).first()
        if wallet:
            wallet.credits += credits_earned
            wallet.total_savings_usd += savings
        
        # Add transaction
        transaction = Transaction(
            user_id=user_id,
            type="savings_credit",
            amount=credits_earned,
            description=f"Savings from routing to {provider}"
        )
        db.add(transaction)
        db.commit()
        
        return RequestLogResponse.model_validate(request_log)
    
    @staticmethod
    def get_user_requests(db: Session, user_id: str, limit: int = 50) -> List[RequestLogResponse]:
        """Get all requests for a user"""
        requests = db.query(RequestLog).filter(
            RequestLog.user_id == user_id
        ).order_by(RequestLog.created_at.desc()).limit(limit).all()
        
        return [RequestLogResponse.model_validate(r) for r in requests]
    
    @staticmethod
    def get_analytics(db: Session, user_id: str) -> Dict[str, Any]:
        """Get analytics summary for a user"""
        requests = db.query(RequestLog).filter(RequestLog.user_id == user_id).all()
        
        if not requests:
            return {
                "total_requests": 0,
                "avg_latency": 0.0,
                "total_savings": 0.0,
                "total_credits": 0,
                "routing_efficiency": 0.0
            }
        
        total_requests = len(requests)
        avg_latency = sum(r.latency_ms for r in requests) / total_requests
        total_savings = sum(r.savings for r in requests)
        
        # Get wallet credits
        wallet = db.query(Wallet).filter(Wallet.user_id == user_id).first()
        total_credits = wallet.credits if wallet else 0
        
        # Calculate routing efficiency (% of requests not using OpenAI)
        optimized_requests = sum(1 for r in requests if r.selected_provider != "OpenAI GPT-4o")
        efficiency = (optimized_requests / total_requests * 100) if total_requests > 0 else 0
        
        return {
            "total_requests": total_requests,
            "avg_latency": round(avg_latency, 2),
            "total_savings": round(total_savings, 4),
            "total_credits": total_credits,
            "routing_efficiency": round(efficiency, 2)
        }

class WalletService:
    @staticmethod
    def get_wallet(db: Session, user_id: str):
        """Get wallet for a user"""
        return db.query(Wallet).filter(Wallet.user_id == user_id).first()
    
    @staticmethod
    def get_recent_transactions(db: Session, user_id: str, limit: int = 5) -> List[TransactionResponse]:
        """Get recent transactions for a user"""
        transactions = db.query(Transaction).filter(
            Transaction.user_id == user_id
        ).order_by(Transaction.created_at.desc()).limit(limit).all()
        
        return [TransactionResponse.model_validate(t) for t in transactions]

class ProviderHealthService:
    @staticmethod
    def get_all_providers(db: Session) -> List[Dict[str, Any]]:
        """Get health status of all providers"""
        providers = db.query(ProviderHealth).all()
        return [
            {
                "provider_name": p.provider_name,
                "health_status": p.health_status,
                "latency_ms": p.latency_ms,
                "last_checked": p.last_checked
            }
            for p in providers
        ]
    
    @staticmethod
    def update_provider_health(db: Session, provider_name: str, health_status: str, latency_ms: int):
        """Update provider health status"""
        provider = db.query(ProviderHealth).filter(
            ProviderHealth.provider_name == provider_name
        ).first()
        
        if provider:
            provider.health_status = health_status
            provider.latency_ms = latency_ms
            provider.last_checked = datetime.utcnow()
        else:
            provider = ProviderHealth(
                provider_name=provider_name,
                health_status=health_status,
                latency_ms=latency_ms
            )
            db.add(provider)
        
        db.commit()
        return provider
    
    @staticmethod
    async def update_health_periodically(db: Session):
        """Background task to update provider health"""
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

async def seed_initial_data(db: Session, user_id: str):
    """Seed initial request data for a user"""
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
    
    # Seed 15 requests
    for i in range(15):
        provider = random.choice(providers)
        prompt = random.choice(prompts)
        latency = random.randint(250, 950)
        tokens = random.randint(50, 1500)
        baseline_cost = round(random.uniform(0.01, 0.05), 4)
        actual_cost = round(random.uniform(0.005, 0.015), 4) if provider != "OpenAI GPT-4o" else baseline_cost
        
        await RequestLogService.log_request(
            db=db,
            user_id=user_id,
            prompt=prompt,
            provider=provider,
            tokens_used=tokens,
            latency=latency,
            baseline_cost=baseline_cost,
            actual_cost=actual_cost
        )
    
    # Initialize provider health data
    for provider in providers:
        ProviderHealthService.update_provider_health(
            db=db,
            provider_name=provider,
            health_status="healthy",
            latency_ms=random.randint(300, 800)
        )

import asyncio
