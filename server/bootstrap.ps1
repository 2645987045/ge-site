param()
$ErrorActionPreference = 'Stop'
$base = 'C:\site-update'
$api  = 'https://api.github.com/repos/2645987045/ge-site/commits/main'
$shaFile = "$base\last.sha"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$sha = ''
try { $sha = (Invoke-RestMethod -Uri $api -UseBasicParsing -TimeoutSec 20).sha } catch { $sha = '' }
$last = if (Test-Path $shaFile) { (Get-Content $shaFile -Raw) } else { '' }
if ($sha -and ($sha.Trim() -eq $last.Trim())) { exit 0 }
$url  = 'https://codeload.github.com/2645987045/ge-site/zip/refs/heads/main?t=' + [DateTime]::Now.Ticks
$zip  = "$base\site.zip"
$tmp  = "$base\tmp"
New-Item -ItemType Directory -Path $base -Force | Out-Null
Invoke-WebRequest -Uri $url -OutFile $zip -UseBasicParsing
Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
Expand-Archive -Path $zip -DestinationPath $tmp -Force
$src = (Get-ChildItem $tmp -Directory | Select-Object -First 1).FullName
$repoSync = Join-Path $src 'server\sync.ps1'
if (Test-Path $repoSync) { & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $repoSync -src $src }
else { Write-Output ('STALE ZIP: ' + $src); exit 1 }
if ($sha) { Set-Content -Path $shaFile -Value $sha -Encoding ascii }
exit 0
