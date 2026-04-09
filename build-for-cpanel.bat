@echo off
setlocal enabledelayedexpansion

echo ========================================
echo  Ocean Connect - Build for cPanel
echo ========================================
echo.

cd /d "D:\Hazza\oceangate"

REM Step 1: Build
echo [1/5] Building Next.js app (standalone mode)...
call npm run build
if errorlevel 1 (
  echo.
  echo ERROR: Build failed. Fix errors above first.
  pause
  exit /b 1
)
echo Build successful.
echo.

REM Step 2: Clear old deploy folder
echo [2/5] Clearing old deploy folder...
if exist deploy rmdir /s /q deploy
mkdir deploy
echo Done.
echo.

REM Step 3: Copy standalone build output
echo [3/5] Copying standalone build...
xcopy .next\standalone deploy\ /E /I /Y >nul
xcopy .next\static deploy\.next\static /E /I /Y >nul
if exist public xcopy public deploy\public /E /I /Y >nul
echo Done.
echo.

REM Step 4: Copy server and config files
echo [4/5] Copying server ^& config files...
copy server.js deploy\ >nul
copy package.json deploy\ >nul
copy .env.example deploy\.env >nul
copy start-production.sh deploy\ >nul
copy stop-production.sh deploy\ >nul
echo Done.
echo.

REM Step 5: Create ZIP using built-in PowerShell (no WinRAR needed)
echo [5/5] Creating cpanel-deploy.zip...
if exist cpanel-deploy.zip del /f /q cpanel-deploy.zip

set ZIP_OK=0
for %%R in (1 2 3) do (
  powershell -NoProfile -Command "$ErrorActionPreference = 'Stop'; Compress-Archive -Path 'deploy\*' -DestinationPath 'cpanel-deploy.zip' -Force"
  if not errorlevel 1 (
    set ZIP_OK=1
    goto :zip_done
  )
  echo Attempt %%R failed. Retrying...
)

:zip_done
if "%ZIP_OK%"=="0" (
  echo.
  echo ERROR: Failed to create zip after 3 attempts. A file is likely locked.
  echo Close running Node/Next processes and retry.
  pause
  exit /b 1
)

if not exist cpanel-deploy.zip (
  echo.
  echo ERROR: Zip command returned but cpanel-deploy.zip was not created.
  pause
  exit /b 1
)

echo.
echo ========================================
echo  cpanel-deploy.zip created successfully!
echo ========================================
echo.
echo File: %CD%\cpanel-deploy.zip
dir cpanel-deploy.zip | find "cpanel"
echo.
echo NEXT STEPS  (see OCEAN-CONNECT-DEPLOY.md)
echo ==========================================
echo 1. Upload cpanel-deploy.zip to cPanel File Manager
echo 2. Extract into your domain's Node.js app root folder
echo 3. Edit the .env file with correct PORT/NODE_ENV
echo 4. Set app entry point to: server.js
echo 5. Click "Run NPM Install" then "Start App"
echo.
pause
endlocal
