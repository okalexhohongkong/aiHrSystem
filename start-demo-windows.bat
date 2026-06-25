@echo off
cd /d "%~dp0"

if not exist node_modules (
  echo Installing dependencies...
  call npm install
)

echo Starting Heiweishi AI HR demo at http://127.0.0.1:5173/
call npm run demo
