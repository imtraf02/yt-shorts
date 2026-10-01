$ErrorActionPreference = "Stop"

$videos = @(
    @{ Name = "VictoriaShort"; Out = "out/queen-victoria.mp4" },
    @{ Name = "AlexanderShort"; Out = "out/alexander-the-great.mp4" },
    @{ Name = "VanGoghShort"; Out = "out/vincent-van-gogh.mp4" },
    @{ Name = "JuliusCaesarShort"; Out = "out/julius-caesar.mp4" }
)

foreach ($v in $videos) {
    if (Test-Path $v.Out) {
        Write-Host "Skipping $($v.Name) because $($v.Out) already exists."
    } else {
        Write-Host "=========================================="
        Write-Host "Rendering $($v.Name) to $($v.Out)..."
        Write-Host "=========================================="
        & npx.cmd remotion render $v.Name $v.Out --concurrency=4
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Failed to render $($v.Name)"
            exit $LASTEXITCODE
        }
        Write-Host "Completed $($v.Name) successfully!"
    }
}

Remove-Item -Path "out\*.png" -Force -ErrorAction SilentlyContinue
Write-Host "All missing videos rendered and cleaned up!"
