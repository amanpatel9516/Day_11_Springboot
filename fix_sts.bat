@echo off
echo ===================================================
echo Spring Tool Suite (STS) Deep Repair Tool
echo ===================================================
echo.
echo Performing repair. Output is being logged to copy_log.txt...
echo.

set "SRC=C:\Users\Hemant\Downloads\spring-tools-for-eclipse-5.2.0.RELEASE-e4.40.0-win32.win32.x86_64\sts-5.2.0.RELEASE"
set "DST=C:\STS\sts-5.2.0.RELEASE"
set "BACKUP_DIR=%TEMP%\sts_backup"
set "LOG_FILE=%~dp0copy_log.txt"

echo Start Repair > "%LOG_FILE%"
echo Source: %SRC% >> "%LOG_FILE%"
echo Destination: %DST% >> "%LOG_FILE%"

if not exist "%SRC%" (
    echo [ERROR] Source folder not found! >> "%LOG_FILE%"
    echo [ERROR] Could not find the source folder in Downloads.
    echo Please make sure the downloaded zip is extracted there.
    pause
    exit /b
)

:: Step 1: Create Backup
echo Backing up Lombok... >> "%LOG_FILE%"
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%" 2>> "%LOG_FILE%"
if exist "%DST%\SpringToolsForEclipse.ini" copy /Y "%DST%\SpringToolsForEclipse.ini" "%BACKUP_DIR%\" >> "%LOG_FILE%" 2>&1
if exist "%DST%\lombok.jar" copy /Y "%DST%\lombok.jar" "%BACKUP_DIR%\" >> "%LOG_FILE%" 2>&1

:: Step 2: Clean old directory
echo Cleaning directories... >> "%LOG_FILE%"
if exist "%DST%" (
    if exist "%DST%\plugins" rmdir /S /Q "%DST%\plugins" >> "%LOG_FILE%" 2>&1
    if exist "%DST%\features" rmdir /S /Q "%DST%\features" >> "%LOG_FILE%" 2>&1
    if exist "%DST%\dropins" rmdir /S /Q "%DST%\dropins" >> "%LOG_FILE%" 2>&1
    if exist "%DST%\configuration" rmdir /S /Q "%DST%\configuration" >> "%LOG_FILE%" 2>&1
    if exist "%DST%\.node" rmdir /S /Q "%DST%\.node" >> "%LOG_FILE%" 2>&1
)

:: Step 3: Copy fresh files using xcopy
echo Copying files using xcopy... >> "%LOG_FILE%"
if not exist "%DST%" mkdir "%DST%" 2>> "%LOG_FILE%"
xcopy "%SRC%" "%DST%" /E /I /H /R /Y >> "%LOG_FILE%" 2>&1
echo Xcopy Exit Code: %ERRORLEVEL% >> "%LOG_FILE%"

:: Step 4: Restore Backup & Clear cache
echo Restoring configurations... >> "%LOG_FILE%"
if exist "%BACKUP_DIR%\SpringToolsForEclipse.ini" (
    copy /Y "%BACKUP_DIR%\SpringToolsForEclipse.ini" "%DST%\" >> "%LOG_FILE%" 2>&1
)
if exist "%BACKUP_DIR%\lombok.jar" (
    copy /Y "%BACKUP_DIR%\lombok.jar" "%DST%\" >> "%LOG_FILE%" 2>&1
)
if exist "%DST%\configuration\org.eclipse.osgi" rmdir /S /Q "%DST%\configuration\org.eclipse.osgi" >> "%LOG_FILE%" 2>&1
if exist "%DST%\configuration\org.eclipse.core.runtime" rmdir /S /Q "%DST%\configuration\org.eclipse.core.runtime" >> "%LOG_FILE%" 2>&1

:: Step 5: Clean up temp backup
echo Cleaning backup... >> "%LOG_FILE%"
rmdir /S /Q "%BACKUP_DIR%" >> "%LOG_FILE%" 2>&1

echo Done! >> "%LOG_FILE%"
echo Repair completed.
pause
