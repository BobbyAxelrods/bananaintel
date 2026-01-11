# Troubleshooting Guide

## 1. "Error saving" or "Network Error"
These errors usually mean the Backend is down or unreachable.

### Check Backend Logs
Run this on your VM to see why the backend is failing:
```bash
docker compose -f docker-compose.prod.yaml logs backend --tail 50
```

### Common Cause: Database Password Mismatch
If you see `asyncpg.exceptions.InvalidPasswordError`, it means the Postgres database was initialized with an old password, and the new password in `.env` doesn't match.

**Fix (Option A: Reset Database - Recommended for fresh install)**
This will DELETE all data and start fresh with the correct password.
```bash
# Stop containers
docker compose -f docker-compose.prod.yaml down

# Remove Postgres volume (WARNING: DELETES DATA)
docker volume rm bananaintel_postgres_data
# Note: Check exact volume name with `docker volume ls` if above fails.

# Restart
docker compose -f docker-compose.prod.yaml up -d --build
```

**Fix (Option B: Update Password - If you want to keep data)**
```bash
# Start Postgres only
docker compose -f docker-compose.prod.yaml up -d postgres

# Enter Postgres container
docker exec -it bananaintel-postgres-1 psql -U admin -d banana

# Run SQL command (Replace 'your_password' with the value from your .env file)
ALTER USER admin WITH PASSWORD 'your_password';
\q

# Restart everything
docker compose -f docker-compose.prod.yaml up -d
```

## 2. Admin Account Missing
If you reset the database, your Admin account is deleted.
1. Go to `https://imbanana.cc/#/admin/signup`
2. Enter your details and the `ADMIN_TOKEN` from your `.env` file.
3. Check your email (or logs if email fails) for verification.

## 3. Deployment Updates
To pull the latest code (including better error messages):
```bash
git pull origin init-2026-01-07
docker compose -f docker-compose.prod.yaml up -d --build frontend
```
