@echo off
echo ==========================================================
echo BAT DAU XUAT VIDEO: FACEBOOK KHONG THU TIEN BAN. VAY AI DANG TRA TIEN?
echo Thoi luong: ~15.6 phut (28.130 frames @ 30fps) - 16:9 1080p
echo ==========================================================
call npx.cmd remotion render FacebookWhoPaysDocumentary out/facebook-ai-tra-tien.mp4 --gl=angle --concurrency=12
if %ERRORLEVEL% NEQ 0 (
    echo [LOI] Xuat video that bai!
    exit /b %ERRORLEVEL%
)

echo ==========================================================
echo HOAN TAT XUAT VIDEO THANH CONG!
echo File ket qua: out/facebook-ai-tra-tien.mp4
echo ==========================================================
