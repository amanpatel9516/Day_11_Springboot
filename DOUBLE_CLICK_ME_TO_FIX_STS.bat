@echo off
title Spring Tool Suite (STS) Auto-Reinstall
echo ===================================================
echo Spring Tool Suite (STS) Auto-Reinstall Tool
echo ===================================================
echo.
echo This script will perform a complete fresh extraction of STS.
echo This will take 1-2 minutes. Please wait...
echo.

set "ZIP=C:\Users\Hemant\Downloads\spring-tools-for-eclipse-5.2.0.RELEASE-e4.40.0-win32.win32.x86_64.zip"
set "DST=C:\STS"
set "EXE_DIR=C:\STS\sts-5.2.0.RELEASE"

if not exist "%ZIP%" (
    echo [ERROR] Could not find the STS zip file in Downloads:
    echo %ZIP%
    pause
    exit /b
)

echo [1/4] Deleting old broken installation...
if exist "%DST%" (
    rmdir /S /Q "%DST%" >nul 2>&1
)

echo [2/4] Extracting fresh STS from zip (please wait)...
mkdir "%DST%" >nul 2>&1
C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -Command "Expand-Archive -Path '%ZIP%' -DestinationPath '%DST%' -Force"

echo [3/4] Setting up Lombok...
if exist "C:\Users\Hemant\Downloads\lombok.jar" (
    copy /Y "C:\Users\Hemant\Downloads\lombok.jar" "%EXE_DIR%\" >nul
)
set "INI=%EXE_DIR%\SpringToolsForEclipse.ini"
if exist "%INI%" (
    C:\Windows\System32\findstr.exe /C:"lombok.jar" "%INI%" >nul
    if errorlevel 1 (
        echo -javaagent:C:\STS\sts-5.2.0.RELEASE\lombok.jar >> "%INI%"
    )
)

echo [4/4] Launching STS...
echo ===================================================
echo Reinstall completed successfully!
echo ===================================================
echo.
start "" "%EXE_DIR%\SpringToolsForEclipse.exe" -clean

exit
