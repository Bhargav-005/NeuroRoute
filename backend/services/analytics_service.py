import random
from datetime import datetime, timedelta
from typing import List, Dict, Any

try:
    from .engine import storage, MetricsService
    ENGINE_AVAILABLE = True
except ImportError:
    ENGINE_AVAILABLE = False

class AnalyticsService:
    @staticmethod
    def get_summary() -> Dict[str, Any]:
        """
        Returns aggregated system metrics. 
        Falls back to realistic mock data if engine/real data is unavailable.
        """
        if ENGINE_AVAILABLE and len(storage.requests) > 0:
            stats = MetricsService.get_summary()
            return {
                "total_requests": stats["total_requests"],
                "avg_latency": stats["avg_latency"],
                "total_savings": stats["total_savings"],
                "total_credits": stats["total_credits"],
                "routing_efficiency": int(stats["routing_efficiency"])
            }
        
        # Mock Fallback for Analytics Page
        return {
            "total_requests": 1420 + random.randint(10, 50),
            "avg_latency": 210 + random.randint(-5, 5),
            "total_savings": round(12.45 + random.uniform(0.1, 0.5), 2),
            "total_credits": 124500 + random.randint(100, 500),
            "routing_efficiency": random.randint(85, 92)
        }

    @staticmethod
    def get_history(limit: int = 24) -> List[Dict[str, Any]]:
        """
        Returns historical trend data for charts (by hour).
        Simulates data for the last 'limit' intervals.
        """
        history = []
        base_time = datetime.utcnow().replace(minute=0, second=0, microsecond=0)
        
        for i in range(limit):
            timestamp = base_time - timedelta(hours=limit - i)
            history.append({
                "timestamp": timestamp.isoformat(),
                "latency": 200 + random.randint(-20, 60),
                "savings": round(random.uniform(0.15, 0.85), 2),
                "requests": random.randint(8, 25)
            })
            
        return history
