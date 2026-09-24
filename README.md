# Remotion YouTube Shorts Generator (9:16)

Hệ thống tạo video ngắn dạng dọc (9:16) chuẩn YouTube Shorts, TikTok, Instagram Reels bằng **Remotion** và **Whisper AI**.

---

## 📖 Tài liệu Hướng dẫn Chuẩn
Tất cả quy chuẩn bắt buộc về layout, vị trí badge, style phụ đề, pipeline Whisper và dọn dẹp file đều được tổng hợp đầy đủ tại:
👉 **[Quy trình Chuẩn Sản xuất Video Shorts](docs/SHORTS_PRODUCTION_GUIDE.md)**

---

## 🎯 Quy tắc Bắt buộc trong Project
1. **Không Like / Subscribe**: Tuyệt đối không chèn nút Like, Subscribe hay CTA.
2. **Top Header**: Chỉ dùng 1 chiếc badge auto-width (`width: fit-content`) thanh thoát, không dùng thanh ngang 1000px hay chữ `FILE #...` / `CHỦ ĐỀ: ...`.
3. **Badge Sự kiện Phân cảnh**:
   - Vị trí: `bottom: 530px` (nâng cao tránh che phụ đề).
   - Kích thước chữ: `24px` in hoa, có đèn neon phát sáng.
4. **Phụ đề Động (Kinetic Captions)**:
   - Vị trí: `bottom: 290px`, căn giữa, active word hiển thị trong viên thuốc dạ quang rực rỡ.
   - Đồng bộ 100% từng từ theo Whisper AI.
5. **Dọn dẹp sau khi render**: Luôn xóa sạch các file ảnh preview/check (`out/*.png`) sau khi xuất video thành công.

---

## 🚀 Danh sách Lệnh Render Nhanh

```bash
# Preview giao diện qua Studio
npm run dev

# Render từng video Shorts đã phát triển:
npm run render:einstein        # Albert Einstein: Thiên tài lộn xộn nhất (97s)
npm run render:tesla           # Nikola Tesla: Những góc khuất bí mật (94s)
npm run render:newton          # Isaac Newton: Sự thật & gia vị (98s)
npm run render:zeigarnik        # Hiệu ứng Zeigarnik ngược (79s)
npm run render:fakebusy        # Hội chứng giả vờ bận rộn (75s)
npm run render:cortisol        # Deadline & Cortisol (63s)
npm run render:desk            # Bẻ khớp & bài tập thể dục bàn làm việc (77s)
```

---

## 📦 Danh sách Thành phẩm trong `out/`
- `out/desk-body-breaks.mp4` (72.5 MB)
- `out/deadline-cortisol.mp4` (66.5 MB)
- `out/fake-busy-syndrome.mp4` (78.8 MB)
- `out/zeigarnik-effect.mp4` (63.7 MB)
- `out/newton-secrets.mp4` (100.0 MB)
- `out/tesla-secrets.mp4` (80.4 MB)
- `out/einstein-secrets.mp4` (97.5 MB)
