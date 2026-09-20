@echo off
echo Stopping anything on port 3001 (frontend)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001 ^| findstr LISTENING') do taskkill /F /PID %%a >nul 2>&1

echo Stopping anything on port 8000 (backend)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do taskkill /F /PID %%a >nul 2>&1

cd /d "%~dp0"

echo Starting backend on http://127.0.0.1:8000 ...
start "shama-backend" cmd /k "cd /d "%~dp0backend" && .venv\Scripts\python -m uvicorn app.main:app --reload"

echo Starting frontend on http://localhost:3001 ...
npm run dev -- -p 3001
