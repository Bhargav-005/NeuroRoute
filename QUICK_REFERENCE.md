# NeuroRoute Quick Reference

## 🚀 Start Everything (3 Commands)

```bash
# Terminal 1: Backend
cd backend
python -m uvicorn main:app --reload

# Terminal 2: Frontend  
cd frontend
pnpm dev

# Terminal 3: PostgreSQL (Windows)
Start-Service -Name "postgresql-x64-15"

# Or on Mac/Linux
brew services start postgresql  # Mac
sudo systemctl start postgresql # Linux
```

Then open: `http://localhost:3000`

---

## 📊 Database Queries

### Check Users Table
```bash
psql -U postgres -d neuroutedb
SELECT * FROM users;
SELECT * FROM wallets;
SELECT * FROM request_logs;
```

### View Logs (Tail)
```bash
SELECT id, user_id, selected_provider, created_at FROM request_logs 
ORDER BY created_at DESC LIMIT 20;
```

### User Transactions
```bash
SELECT * FROM transactions 
WHERE user_id = 'user_id_here'
ORDER BY created_at DESC;
```

---

## 🔑 Environment Variables

### Create `backend/.env`
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/neuroutedb
SECRET_KEY=generate-random-string-here
GOOGLE_CLIENT_ID=from-google-cloud-console
GOOGLE_CLIENT_SECRET=from-google-cloud-console
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

### Create `frontend/.env.local`
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

---

## 🧪 API Testing

### Get JWT Token (from localStorage)
```javascript
// In browser console:
localStorage.getItem('neuroroute_token')
```

### Test Endpoints
```bash
# Get current user
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/auth/me

# Get wallet
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/wallet/balance

# Get analytics
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/analytics/summary

# Get all requests
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/analytics/requests

# Get providers
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/analytics/providers
```

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |
| API ReDoc | http://localhost:8000/redoc |
| Google Cloud Creds | https://console.cloud.google.com/ |

---

## 🛠️ Common Tasks

### Reset Database
```bash
# Delete database
psql -U postgres -c "DROP DATABASE neuroutedb;"

# Recreate database
psql -U postgres -c "CREATE DATABASE neuroutedb;"

# Backend will auto-initialize on startup
```

### View Backend Logs
```bash
# Check running processes
netstat -ano | findstr :8000

# Kill if stuck
taskkill /PID 12345 /F
```

### Clear Frontend Auth
```javascript
// In browser console:
localStorage.removeItem('neuroroute_token')
localStorage.removeItem('neuroroute_user')
```

### Generate Secret Key
```python
# In Python:
import secrets
print(secrets.token_urlsafe(32))
```

---

## 📝 Adding New Features

### Add API Endpoint
1. Create route in `backend/routes/`
2. Add `@router.get/post()` decorator
3. Include `Depends(get_current_user_db)` for protection
4. Add database queries using services
5. Include in `main.py` with `app.include_router()`

### Add Database Model
1. Create model in `models/db_models.py`
2. Add to `database.py` Base metadata
3. Create service functions in `services/db_service.py`
4. Database auto-initializes on next startup

### Add Frontend Component
1. Create component in `frontend/components/`
2. Use `useAuth()` for authentication
3. Use `APIClient` for API calls
4. Handle loading & error states

---

## 🐛 Debug Mode

### Backend Debug Logs
```python
# In services, add:
import logging
logger = logging.getLogger(__name__)
logger.debug("Message here")
logger.error("Error message")
```

### Frontend Debug
```javascript
// In localStorage:
localStorage.getItem('neuroroute_token')
localStorage.getItem('neuroroute_user')

// In console:
fetch('http://localhost:8000/auth/me', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('neuroroute_token')}`
  }
}).then(r => r.json()).then(console.log)
```

### Database Debug  
```bash
# Verbose PostgreSQL logs
psql -U postgres -d neuroutedb -c "SET log_statement = 'all';"
```

---

## ✅ Checklist Before Deployment

- [ ] Update SECRET_KEY to strong random value
- [ ] Update GOOGLE_CLIENT_* with production credentials
- [ ] Change database password
- [ ] Update DATABASE_URL to production database
- [ ] Set ENVIRONMENT=production
- [ ] Update CORS allowed_origins
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure error logging/monitoring
- [ ] Test all authentication flows
- [ ] Load test API endpoints

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| QUICK_START.md | Fast 5-min setup |
| SETUP_GUIDE.md | Complete setup guide |
| ARCHITECTURE.md | System design & schema |
| This file | Quick reference |

---

## 🚀 Go Live Checklist

1. **Database**: Setup production PostgreSQL
2. **Secrets**: Generate new SECRET_KEY
3. **Google OAuth**: Update production credentials
4. **Environment**: Set all production env vars
5. **Backend**: Deploy FastAPI app
6. **Frontend**: Build & deploy Next.js
7. **SSL/TLS**: Configure HTTPS
8. **Monitoring**: Setup error tracking
9. **Testing**: Run full integration tests
10. **Launch**: Enable in production

---

**Need Help?** See SETUP_GUIDE.md → Troubleshooting section
