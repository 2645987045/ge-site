@echo off
echo Deploying personal site to IIS (port 8080) ...
robocopy "\\tsclient\D\community\personal-site" "C:\inetpub\wwwroot-personal" /MIR
echo.
echo Deploy done! Open http://121.43.231.108:8080 in your browser.
pause
