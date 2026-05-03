# setup.ps1
# Quick setup script for NeuroRoute Backend & Database

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "NeuroRoute Backend & Database Setup" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if PostgreSQL is running
Write-Host "Checking PostgreSQL status..." -ForegroundColor Green

$postgresRunning = Get-Service | Where-Object { $_.Name -like "*postgre*" -and $_.Status -eq "Running" }

if (-not $postgresRunning) {
    Write-Host "Starting PostgreSQL service..." -ForegroundColor Yellow
    Start-Service -Name "postgresql-x64-15" -ErrorAction SilentlyContinue
    Write-Host "PostgreSQL service started" -ForegroundColor Green
} else {
    Write-Host "PostgreSQL is already running" -ForegroundColor Green
}

Write-Host ""

# Create database if it doesn't exist
Write-Host "Setting up database..." -ForegroundColor Green
Write-Host "Enter PostgreSQL admin password:" -ForegroundColor Yellow
$postgres_password = Read-Host -AsSecureString
$postgres_password_plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($postgres_password))

# Create database
$createDbScript = @"
CREATE DATABASE IF NOT EXISTS neuroutedb;
"@

try {
    $createDbScript | psql -U postgres -h localhost
    Write-Host "Database created/verified successfully" -ForegroundColor Green
} catch {
    Write-Host "Error creating database: $_" -ForegroundColor Red
}

Write-Host ""

# Setup Python environment
Write-Host "Setting up Python environment..." -ForegroundColor Green
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow

Push-Location backend
python -m pip install -r requirements.txt --upgrade
Pop-Location

Write-Host "Backend dependencies installed" -ForegroundColor Green

Write-Host ""

# Create .env file
Write-Host "Creating environment configuration..." -ForegroundColor Green

Write-Host ""
Write-Host "You need to add Google OAuth credentials:" -ForegroundColor Yellow
Write-Host "1. Go to: https://console.cloud.google.com/" -ForegroundColor Cyan
Write-Host "2. Create new project" -ForegroundColor Cyan
Write-Host "3. Enable Google+ API" -ForegroundColor Cyan
Write-Host "4. Create OAuth 2.0 Web Application credentials" -ForegroundColor Cyan
Write-Host "5. Add authorized redirect URIs:" -ForegroundColor Cyan
Write-Host "   - http://localhost:3000" -ForegroundColor Cyan
Write-Host "   - http://localhost:8000/auth/google-signin" -ForegroundColor Cyan
Write-Host ""

$google_client_id = Read-Host "Enter Google Client ID"
$google_client_secret = Read-Host "Enter Google Client Secret"

# Create .env file in backend
$envContent = @"
DATABASE_URL=postgresql://postgres:$postgres_password_plain@localhost:5432/neuroutedb
SECRET_KEY=$(openssl rand -hex 32 2>$null || [convert]::ToBase64String((1..32|ForEach-Object{[byte](Get-Random -Max 256)})))
GOOGLE_CLIENT_ID=$google_client_id
GOOGLE_CLIENT_SECRET=$google_client_secret
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
ENVIRONMENT=development
"@

$envContent | Out-File -FilePath "backend\.env" -Encoding UTF8 -Force
Write-Host ".env file created" -ForegroundColor Green

# Create frontend .env.local
$frontendEnvContent = @"
NEXT_PUBLIC_GOOGLE_CLIENT_ID=$google_client_id
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
"@

$frontendEnvContent | Out-File -FilePath "frontend\.env.local" -Encoding UTF8 -Force
Write-Host "Frontend environment file created" -ForegroundColor Green

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Open Terminal 1 - Backend:" -ForegroundColor Cyan
Write-Host "   cd backend" -ForegroundColor White
Write-Host "   python -m uvicorn main:app --reload" -ForegroundColor White
Write-Host ""
Write-Host "2. Open Terminal 2 - Frontend:" -ForegroundColor Cyan
Write-Host "   cd frontend" -ForegroundColor White
Write-Host "   pnpm dev" -ForegroundColor White
Write-Host ""
Write-Host "3. Open browser:" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:8000" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
