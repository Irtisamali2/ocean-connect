@echo off
setlocal enabledelayedexpansion

echo ========================================
echo  Ocean Connect - Static Build for cPanel
echo ========================================
echo.

cd /d "D:\Hazza\oceangate"

REM Step 1: Build static export
echo [1/3] Building static export...
call npm run build
if errorlevel 1 (
  echo.
  echo ERROR: Build failed. Fix errors above first.
  pause
  exit /b 1
)

if not exist out (
  echo.
  echo ERROR: Static export folder 'out' was not created.
  pause
  exit /b 1
)

echo Build successful.
echo.

REM Step 2: Create zip from out folder
echo [2/3] Creating cpanel-static.zip...
if exist cpanel-static.zip del /f /q cpanel-static.zip
powershell -NoProfile -Command "$ErrorActionPreference = 'Stop'; Compress-Archive -Path 'out\*' -DestinationPath 'cpanel-static.zip' -Force"
if errorlevel 1 (
  echo.
  echo ERROR: Failed to create cpanel-static.zip.
  pause
  exit /b 1
)

if not exist cpanel-static.zip (
  echo.
  echo ERROR: cpanel-static.zip was not created.
  pause
  exit /b 1
)

echo Done.
echo.

REM Step 3: Show result
echo [3/3] Ready for upload
echo File: %CD%\cpanel-static.zip
dir cpanel-static.zip | find "cpanel-static"
echo.
echo Upload this zip to public_html and extract it.
echo No Node.js app is required for static deployment.
echo.
pause
endlocal
