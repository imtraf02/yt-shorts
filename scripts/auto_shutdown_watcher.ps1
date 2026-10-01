param(
    [int]$TargetPid = 2704
)

Write-Host "Watching PID $TargetPid..."
try {
    $proc = Get-Process -Id $TargetPid -ErrorAction Stop
    $proc.WaitForExit()
} catch {
    Write-Host "Target PID $TargetPid has exited or is not running."
}

# Đợi 10 giây để đảm bảo file buffer được đóng hoàn tất
Start-Sleep -Seconds 10

$maya = Join-Path $PSScriptRoot "..\out\maya-documentary.mp4"
$dino = Join-Path $PSScriptRoot "..\out\dinosaur-documentary.mp4"

Write-Host "Render finished. Triggering shutdown in 60 seconds..."
shutdown.exe /s /t 60 /c "Xuat ca 2 video tai lieu thanh cong! May tinh se tu dong tat nguon sau 60 giay."
