param([string]$src)
$ErrorActionPreference = 'Stop'
robocopy "$src\personal-site" 'C:\inetpub\wwwroot-personal' /MIR /NFL /NDL /NJH /NJS | Out-Null
robocopy "$src\wuyzhang-gaoshi-website\dist" 'C:\inetpub\wwwroot' /MIR /NFL /NDL /NJH /NJS | Out-Null
Write-Output ('SYNC OK ' + (Get-Date))
exit 0
