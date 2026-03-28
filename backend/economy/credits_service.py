from datetime import datetime
from typing import List, Dict, Any

class CreditsService:
    BASELINE_COST = 0.005 # GPT-4o reference baseline
    
    def __init__(self):
        # In-memory session store
        self.total_credits = 12500
        self.total_savings = 12.50
        self.transaction_history = []

    def calculate_and_save(self, actual_cost: float) -> Dict[str, Any]:
        """
        Calculates savings and credits based on actual performance vs baseline. 
        Stores the result in the transaction history.
        """
        savings = max(0, self.BASELINE_COST - actual_cost)
        credits_earned = int(savings * 100000)
        
        # Update session totals
        self.total_credits += credits_earned
        self.total_savings += savings
        
        # Track history (limit last 10)
        transaction = {
            "credits": credits_earned,
            "savings": round(savings, 6),
            "timestamp": datetime.utcnow().isoformat(),
            "id": f"tx_{int(datetime.utcnow().timestamp())}"
        }
        self.transaction_history.insert(0, transaction)
        self.transaction_history = self.transaction_history[:10]
        
        return {
            "savings": round(savings, 6),
            "credits": credits_earned
        }

    def get_balance(self) -> Dict[str, Any]:
        """Returns current wallet metrics."""
        return {
            "credits": self.total_credits,
            "total_saved_usd": round(self.total_savings, 2)
        }

    def get_history(self) -> List[Dict[str, Any]]:
        """Returns the last 10 reward transactions."""
        return self.transaction_history

# Singleton instance for the platform session
credits_service = CreditsService()
