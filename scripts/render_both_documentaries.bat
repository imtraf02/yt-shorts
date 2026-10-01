@echo off
echo ==========================================================
echo [1/2] BAT DAU XUAT VIDEO MAYA DOCUMENTARY (~14.1 PHUT)
echo ==========================================================
call npx remotion render MayaDocumentary out/maya-documentary.mp4 --gl=angle --concurrency=12
if %ERRORLEVEL% NEQ 0 (
    echo [LOI] Xuat MayaDocumentary that bai!
    exit /b %ERRORLEVEL%
)

echo ==========================================================
echo [2/2] BAT DAU XUAT VIDEO DINOSAUR DOCUMENTARY (~17.3 PHUT)
echo ==========================================================
call npx remotion render DinosaurDocumentary out/dinosaur-documentary.mp4 --gl=angle --concurrency=12
if %ERRORLEVEL% NEQ 0 (
    echo [LOI] Xuat DinosaurDocumentary that bai!
    exit /b %ERRORLEVEL%
)

echo ==========================================================
echo HOAN TAT XUAT CA 2 VIDEO TAI LIEU THANH CONG!
echo - out/maya-documentary.mp4
echo - out/dinosaur-documentary.mp4
echo ==========================================================
