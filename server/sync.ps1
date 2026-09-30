param([string]$src)
$ErrorActionPreference = 'Stop'
robocopy "$src\personal-site" 'C:\inetpub\wwwroot-personal' /MIR /NFL /NDL /NJH /NJS | Out-Null
$c1 = $LASTEXITCODE
robocopy "$src\wuyzhang-gaoshi-website\dist" 'C:\inetpub\wwwroot' /MIR /NFL /NDL /NJH /NJS | Out-Null
$c2 = $LASTEXITCODE
$changed = ($c1 -ge 1) -or ($c2 -ge 1)
try { Copy-Item -LiteralPath (Join-Path $src 'server\bootstrap.ps1') -Destination 'C:\site-update\sync.ps1' -Force } catch {}
try { Set-Content -LiteralPath 'C:\inetpub\wwwroot-personal\sync-status.txt' -Value ('sync v3 ' + (Get-Date) + ' changed=' + $changed) -Encoding ascii } catch {}
if ($changed) { iisreset | Out-Null }
Write-Output ('SYNC OK ' + (Get-Date) + ' changed=' + $changed)
exit 0
