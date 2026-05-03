# Quick Start Guide

## 🚀 FAST SETUP (5 minutes)

### Option 1: Automated Setup (Recommended)

**Windows (PowerShell):**
```powershell
# Run from project root
.\setup.ps1
```

**Mac/Linux:**
```bash
# Make script executable
chmod +x setup.sh

# Run setup
./setup.sh
```

### Option 2: Manual Setup

**1. Start PostgreSQL:**
```
# Windows - Open Services and start PostgreSQL
# or via PowerShell:
Start-Service -Name "postgresql-x64-15"

# Mac (via Homebrew):
brew services start postgresql

# Linux:
sudo systemctl start postgresql
```

**2. Create Database:**
```bash
psql -U postgres
CREATE DATABASE neuroutedb;
\q
```

**3. Get Google OAuth Credentials:**
- Visit: https://console.cloud.google.com/
- Create project "NeuroRoute"
- Enable Google+ API
- Create OAuth 2.0 credentials
- Copy Client ID and Secret

**4. Create `.env` in backend/**
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/neuroutedb
SECRET_KEY=your-super-secret-key-change-this-in-production
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
ENVIRONMENT=development
```

**5. Install Backend Dependencies:**
```bash
cd backend
pip install -r requirements.txt
```

**6. Start Backend:**
```bash
# From backend directory
python -m uvicorn main:app --reload
```

Backend is now at: `http://localhost:8000`

**7. Install Frontend Dependencies:**
```bash
cd frontend
pnpm install  # or npm install
```

**8. Create `frontend/.env.local`:**
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

**9. Start Frontend:**
```bash
# From frontend directory
pnpm dev  # or npm run dev
```

Frontend is now at: `http://localhost:3000`

---

## ✅ Test Everything Works

### 1. Sign In with Google
- Go to: `http://localhost:3000/auth/login`
- Click "Continue with Google"
- Sign in with your Google account
- Should redirect to dashboard ✓

### 2. Check Token
Open browser console and run:
```javascript
localStorage.getItem('neuroroute_token')
// Should print your JWT token
```

### 3. Test API
```bash
# Replace YOUR_TOKEN with actual token
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/auth/me

# Get wallet balance
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/wallet/balance

# Get analytics
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/analytics/summary
```

---

## 📚 Detailed Setup Guide

See `SETUP_GUIDE.md` for:
- Complete PostgreSQL setup
- Google OAuth detailed instructions
- Database schema documentation
- Troubleshooting guide
- Production deployment checklist

---

## 🔑 Key Features Implemented

✅ PostgreSQL database integration
✅ Google OAuth2 Sign-in
✅ JWT Token authentication
✅ User management
✅ Wallet system with credits
✅ Request logging
✅ Transaction tracking
✅ Provider health monitoring
✅ Protected API endpoints
✅ Automatic database initialization

---

## 📁 What Changed

### Backend Files Created:
- `database.py` - Database connection & SQLAlchemy config
- `models/db_models.py` - Database models (User, Wallet, RequestLog, etc.)
- `schemas.py` - Pydantic schemas for validation
- `services/auth.py` - Google OAuth & JWT authentication
- `services/db_service.py` - Database operations & business logic
- `routes/auth.py` - Authentication endpoints
- `.env` - Environment configuration

### Backend Files Updated:
- `main.py` - Database init, lifespan management
- `requirements.txt` - New dependencies added
- `routes/wallet.py` - Migrated to database
- `routes/analytics.py` - Migrated to database
- `routes/chat.py` - Added database logging

### Frontend Files Created:
- `lib/api-client.js` - Authenticated API client utility
- `frontend/.env.local` - Frontend config

### Frontend Files Updated:
- `components/auth/auth-context.jsx` - Google OAuth integration
- `app/auth/login/page.jsx` - Google Sign-in UI

---

## 🐛 Common Issues & Solutions

**"psql: could not connect to server"**
- PostgreSQL not running
- Start: `net start postgresql-x64-15` (Windows)

**"GOOGLE_CLIENT_ID not set"**
- Add to `.env` file
- Restart backend

**"JWT verification failed"**
- Check `SECRET_KEY` matches in `.env`
- Clear browser localStorage and re-login

**"Port 8000/3000 already in use"**
```bash
# Find process
netstat -ano | findstr :8000
# Kill process
taskkill /PID <PID> /F
```

---

## 🎉 You're All Set!

Your NeuroRoute backend is now production-ready with:
- ✅ Real PostgreSQL database
- ✅ Google authentication
- ✅ Secure JWT tokens  
- ✅ User management
- ✅ API protection

**Happy coding! 🚀**
