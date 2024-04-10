@echo off
node cli %1 %2 %3 %4 %5 %6 %7 %8 %9

if %errorlevel% neq 0 (
  powershell -command "Write-Host 'Error: %errorlevel%' -ForegroundColor Red"
) else (
  powershell -command "Write-Host 'Done. Script ran successfully.' -ForegroundColor Green"
)