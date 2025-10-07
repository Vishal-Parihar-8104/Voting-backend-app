@echo off
echo Starting Digital Voting System...
echo.

echo Starting Backend Server...
start "Backend" cmd /k "cd /d D:\VotingApp && npm start"

echo.
echo Starting Frontend Server...
start "Frontend" cmd /k "cd /d D:\VotingApp\frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3000
echo Frontend: http://localhost:3001
echo.
pause






