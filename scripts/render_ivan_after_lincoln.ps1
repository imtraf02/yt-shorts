$ErrorActionPreference = "Stop"

Write-Host "Waiting for Lincoln render to finish (watching for out/abraham-lincoln.mp4)..."
while (-not (Test-Path 'out/abraham-lincoln.mp4')) {
    Start-Sleep -Seconds 5
}
Write-Host "Lincoln render completed! Waiting 3 seconds for file handle release..."
Start-Sleep -Seconds 3

Write-Host "=========================================="
Write-Host "Rendering IvanShort to out/ivan-the-terrible.mp4..."
Write-Host "=========================================="
& npx.cmd remotion render IvanShort out/ivan-the-terrible.mp4 --concurrency=4

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to render IvanShort"
    exit $LASTEXITCODE
}

Write-Host "IvanShort render completed successfully!"

# Housekeeping: Clean preview pngs and temp audio
Remove-Item -Path "out\*.png" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "temp_16k_*.wav" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "tmp.json" -Force -ErrorAction SilentlyContinue

Write-Host "All tasks completed!"
