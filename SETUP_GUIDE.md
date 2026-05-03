# NeuroRoute Backend Setup Guide

Complete end-to-end setup for PostgreSQL database integration, Google OAuth2 authentication, and JWT token management.

## Prerequisites

- PostgreSQL 12+ installed
- Python 3.9+
- Node.js 18+ (for frontend)
- Google Cloud Project created

## Step 1: PostgreSQL Setup

### Windows Setup

1. **Download and Install PostgreSQL:**
   - Download from: https://www.postgresql.org/download/windows/
   - During installation, remember the password you set for `postgres` user

2. **Create Database:**
   ```bash
   # Open Command Prompt or PowerShell
   psql -U postgres
   
   # Create database
   CREATE DATABASE neuroutedb;
   
   # Verify
   \l
   
   # Exit
   \q
   ```

### Verify Database Connection

```bash
psql -U postgres -d neuroutedb
```

You should see the psql prompt: `neuroutedb=#`

## Step 2: Google OAuth2 Configuration

### Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project named "NeuroRoute"
3. Enable Google+ API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

### Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - `http://localhost:3000`
   - `http://localhost:3000/auth/login`
   - `http://localhost:8000/auth/google-signin`
5. Click "Create"
6. Copy the Client ID and Client Secret
7. Download the JSON file for reference

## Step 3: Backend Setup

### 1. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create or update `.env` file in backend directory:

```env
# PostgreSQL Configuration
DATABASE_URL=postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/neuroutedb

# JWT Configuration (Change to a strong random string in production)
SECRET_KEY=your-super-secret-key-change-this-in-production-with-a-VERY-long-random-value

# Google OAuth Configuration
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE

# Backend Configuration
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

# Environment
ENVIRONMENT=development
```

### 3. Initialize Database Tables

```bash
# Run backend to auto-create tables
python -m uvicorn backend.main:app --reload

# Or manually with Python
python -c "from backend.database import Base, engine; Base.metadata.create_all(bind=engine)"
```

The backend will automatically:
- Create all database tables
- Create a demo user for testing
- Seed initial request data
- Initialize provider health data

### 4. Run Backend Server

```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`

## Step 4: Frontend Setup

### 1. Add Google Client ID

Create or update `.env.local` in frontend directory:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### 2. Install Frontend Dependencies

```bash
cd frontend
pnpm install
# or
npm install
```

### 3. Run Frontend

```bash
pnpm dev
# or
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## Step 5: Test the Application

### Test Google Sign-In

1. Open `http://localhost:3000/auth/login` in your browser
2. Click "Continue with Google"
3. Sign in with your Google account
4. You should be redirected to the dashboard
5. Token will be stored in localStorage

### Test API Endpoints

#### Get User Info
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/auth/me
```

#### Get Wallet Balance
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/wallet/balance
```

#### Get Analytics
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/analytics/summary
```

#### Get Recent Requests
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/analytics/requests
```

## Database Schema

### Users Table
- `id` (UUID): Primary key
- `google_id` (String): Google OAuth ID
- `email` (String): User email (unique)
- `name` (String): User name
- `picture_url` (String): Profile picture URL
- `is_active` (Boolean): Account status
- `created_at` (DateTime): Account creation timestamp
- `updated_at` (DateTime): Last update timestamp

### Wallets Table
- `id` (UUID): Primary key
- `user_id` (UUID): Foreign key to Users
- `credits` (Integer): Current credit balance
- `total_savings_usd` (Float): Cumulative savings
- `created_at` (DateTime): Wallet creation timestamp
- `updated_at` (DateTime): Last update timestamp

### Request Logs Table
- `id` (UUID): Primary key
- `user_id` (UUID): Foreign key to Users
- `prompt` (Text): User prompt
- `selected_provider` (String): AI provider used
- `latency_ms` (Integer): Response latency in milliseconds
- `tokens_used` (Integer): Number of tokens used
- `actual_cost` (Float): Actual cost
- `baseline_cost` (Float): Baseline cost (GPT-4o)
- `savings` (Float): Cost savings
- `credits_earned` (Integer): Credits earned from savings
- `created_at` (DateTime): Request timestamp

### Transactions Table
- `id` (UUID): Primary key
- `user_id` (UUID): Foreign key to Users
- `type` (String): Transaction type (credit_earned, usage, savings_credit)
- `amount` (Integer): Transaction amount (in credits)
- `description` (String): Transaction description
- `created_at` (DateTime): Transaction timestamp

### Provider Health Table
- `id` (UUID): Primary key
- `provider_name` (String): Provider name (unique)
- `health_status` (String): Status (healthy, degraded, down)
- `latency_ms` (Integer): Average latency
- `last_checked` (DateTime): Last health check timestamp

## Troubleshooting

### Database Connection Error
```
Error: could not connect to server: Connection refused
```
**Solution:** Ensure PostgreSQL is running
```bash
# Windows
net start postgresql-x64-15

# Or open Services and start PostgreSQL service
```

### Google Sign-In Not Working
1. Verify Google Client ID is correct in `.env`
2. Check authorized redirect URIs in Google Cloud Console
3. Check browser console for errors
4. Ensure backend is running on `http://localhost:8000`

### JWT Token Errors
1. Verify `SECRET_KEY` in `.env` is set
2. Check token is being passed correctly in Authorization header
3. Bearer token format: `Authorization: Bearer YOUR_TOKEN`

### Port Already in Use
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill process
taskkill /PID <PID> /F
```

## Production Deployment

### Update Environment Variables
```env
DATABASE_URL=postgresql://user:password@prod-db-host:5432/neuroutedb
SECRET_KEY=<generate-strong-random-key>
GOOGLE_CLIENT_ID=<production-client-id>
GOOGLE_CLIENT_SECRET=<production-client-secret>
BACKEND_URL=https://api.neurouteai.com
FRONTEND_URL=https://neurouteai.com
ENVIRONMENT=production
```

### Security Checklist
- [ ] Change SECRET_KEY to a strong random value
- [ ] Use HTTPS only
- [ ] Update CORS allowed origins
- [ ] Use database connection pooling
- [ ] Enable SSL/TLS for database connection
- [ ] Set secure cookie flags
- [ ] Update Google OAuth redirect URIs
- [ ] Use environment-specific config files

## Next Steps

1. ✅ Database is set up with PostgreSQL
2. ✅ Google OAuth2 is configured
3. ✅ Backend has database integration
4. ✅ Frontend has Google Sign-in integrated
5. 🚀 Deploy to production

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review backend logs: `http://localhost:8000/docs`
3. Check frontend console: F12 in browser
4. Verify all environment variables are set correctly
