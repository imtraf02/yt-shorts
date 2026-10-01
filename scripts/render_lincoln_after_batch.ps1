$ErrorActionPreference = "Stop"

Write-Host "Waiting for batch render to finish (watching for out/julius-caesar.mp4)..."
while (-not (Test-Path 'out/julius-caesar.mp4')) {
    Start-Sleep -Seconds 5
}
Write-Host "Batch render completed! Waiting 3 seconds for file handle release..."
Start-Sleep -Seconds 3

Write-Host "=========================================="
Write-Host "Rendering LincolnShort to out/abraham-lincoln.mp4..."
Write-Host "=========================================="
& npx.cmd remotion render LincolnShort out/abraham-lincoln.mp4 --concurrency=4

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to render LincolnShort"
    exit $LASTEXITCODE
}

Write-Host "LincolnShort render completed successfully!"

# Housekeeping: Clean preview pngs and temp audio
Remove-Item -Path "out\*.png" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "temp_16k_lincoln.wav" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "tmp.json" -Force -ErrorAction SilentlyContinue

Write-Host "All tasks completed!"
