from typing import Literal, Dict

# Routing Strategy Configuration (Cost vs. Performance tradeoffs)
STRATEGIES = {
    "cost": {"cost": 0.6, "latency": 0.2, "quality": 0.2},
    "balanced": {"cost": 0.35, "latency": 0.35, "quality": 0.3},
    "performance": {"cost": 0.2, "latency": 0.3, "quality": 0.5}
}

class StrategyEngine:
    def __init__(self):
        self._current_strategy = "balanced" # Default startup mode

    def get_current_strategy(self) -> str:
        """Returns the active platform strategy."""
        return self._current_strategy

    def set_strategy(self, mode: Literal["cost", "balanced", "performance"]) -> str:
        """Updates the globally active execution strategy."""
        if mode in STRATEGIES:
            self._current_strategy = mode
            return mode
        return self._current_strategy

    def get_weights(self) -> Dict[str, float]:
        """Returns normalized scoring weights for model routing based on active strategy."""
        return STRATEGIES.get(self._current_strategy, STRATEGIES["balanced"])

# Shared engine instance for consistent routing behavior across sessions
strategy_engine = StrategyEngine()
