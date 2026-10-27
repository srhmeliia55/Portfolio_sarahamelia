@echo off
setlocal
title Portfolio Sarah - Dev Server
cd /d "%~dp0"

echo ==================================================
echo   Portfolio Sarah Amelia - Development Server
echo ==================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js tidak ditemukan.
  echo         Install Node.js dari https://nodejs.org lalu coba lagi.
  goto :gagal
)

if not exist "node_modules" (
  echo [SETUP] Folder node_modules belum ada. Menjalankan npm install...
  call npm install
  if errorlevel 1 goto :gagal
  echo.
)

echo [INFO] Server akan berjalan di http://localhost:3000
echo [INFO] Tekan Ctrl+C untuk menghentikan server.
echo.
echo --------------------------------------------------
echo.

call npm run dev
set "KODE=%ERRORLEVEL%"

echo.
echo --------------------------------------------------
if "%KODE%"=="0" (
  echo [INFO] Server sudah berhenti.
) else (
  echo [INFO] Server berhenti dengan kode %KODE%.
)
echo [INFO] Jika muncul pertanyaan "Terminate batch job", tekan Y.
echo.
pause
exit /b %KODE%

:gagal
echo.
echo [ERROR] Server gagal dijalankan.
pause
exit /b 1
