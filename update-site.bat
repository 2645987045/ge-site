@echo off
echo Deploying site to IIS ...
robocopy "\\tsclient\D\community\wuyzhang-gaoshi-website\dist" "C:\inetpub\wwwroot" /MIR
echo.
echo Deploy done! Open http://121.43.231.108 in your browser.
pause
