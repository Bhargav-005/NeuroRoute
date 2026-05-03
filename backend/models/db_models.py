from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Boolean, Enum, Text
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
import enum

from ..database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    google_id = Column(String, unique=True, nullable=True, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    picture_url = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    wallet = relationship("Wallet", back_populates="user", uselist=False, cascade="all, delete-orphan")
    requests = relationship("RequestLog", back_populates="user", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="user", cascade="all, delete-orphan")

class Wallet(Base):
    __tablename__ = "wallets"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), unique=True, nullable=False)
    credits = Column(Integer, default=250000)
    total_savings_usd = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="wallet")

class RequestLog(Base):
    __tablename__ = "request_logs"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    prompt = Column(Text, nullable=False)
    selected_provider = Column(String, nullable=False)
    latency_ms = Column(Integer, nullable=False)
    tokens_used = Column(Integer, nullable=False)
    actual_cost = Column(Float, nullable=False)
    baseline_cost = Column(Float, nullable=False)
    savings = Column(Float, nullable=False)
    credits_earned = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relationships
    user = relationship("User", back_populates="requests")

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    type = Column(String, nullable=False)  # "credit_earned", "usage", "savings_credit"
    amount = Column(Integer, nullable=False)
    description = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relationships
    user = relationship("User", back_populates="transactions")

class ProviderHealth(Base):
    __tablename__ = "provider_health"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    provider_name = Column(String, unique=True, nullable=False, index=True)
    health_status = Column(String, default="healthy")  # "healthy", "degraded", "down"
    latency_ms = Column(Integer, nullable=False)
    last_checked = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
