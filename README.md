# Tour Du Lịch Nha Trang — Bài thuyết trình Nhóm 4

Bài thuyết trình **15 slide** về đề tài *Thiết kế tour du lịch Nha Trang 3 ngày 2 đêm*, dựng theo 3 phiên bản: web Next.js (bản chính, hiệu ứng awwwards-style), trang chiếu tĩnh độc lập 1 file `index.html`, và file PowerPoint gốc.

**Nhóm 4 thực hiện:** Kỳ Anh · Minh Nhật · Anh Thư · Thanh Nguyên

## Nội dung bài thuyết trình (4 phần)

| Phần | Nội dung |
|------|----------|
| 01 — Giới thiệu | Bìa · Thành viên nhóm · Agenda · Nha Trang có gì |
| 02 — Thực trạng | Lý do chọn đề tài & mục tiêu · Tiềm năng (dự báo 2026) · Thách thức |
| 03 — Thiết kế tour | Tổng quan tour · Lịch trình 3 ngày 2 đêm · Chi phí dự trù |
| 04 — Kết luận | Kết luận · Q&A |

Số liệu phần Tiềm năng: **23,7 triệu** lượt khách du lịch tổng · **hơn 9,4 triệu** lượt khách quốc tế · **hơn 80.200 tỷ đồng** doanh thu du lịch dự kiến (dự báo cả năm 2026).

## 3 phiên bản sử dụng

### 1. Web Next.js (bản chính)

Giao diện fullpage scroll — mỗi slide chiếm đúng 1 màn hình, cuộn mượt theo phong cách awwwards.

```bash
bun install        # hoặc npm install
npx prisma generate
bun run dev        # hoặc npm run dev → http://localhost:3000
```

- Di chuyển: cuộn chuột, phím `↑ ↓ Space PageUp PageDown Home End`
- Nhấn `F` hoặc `F11` để xem từng phần toàn màn hình
- Thanh tiến trình + dot điều hướng bên phải

### 2. index.html — 1 file độc lập

Mở trực tiếp bằng double-click (`download/index.html`), hoặc host ở bất kỳ đâu (GitHub Pages, Netlify…). Gồm đủ 15 slide + trình chơi:

- Scroll-snap từng slide, canvas 1280×720 tự scale theo màn hình
- **Hiệu ứng nhảy chữ khi chuyển slide** — từng ký tự nảy vào vị trí (bỏ qua icon, tôn trọng `prefers-reduced-motion`)
- Dot nav · đếm slide · progress bar · fullscreen (`F`) · in ra PDF được (`Ctrl+P`)

### 3. PowerPoint

`download/Tour-du-lich-Nha-Trang.pptx` — bản PPT gốc 15 slide.

## Thiết kế

- **Palette:** xanh navy `#0A3D62` · mint `#2EC4B6` · nền sáng `#E9F1F6`
- **Font:** [Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro) (subset `latin` + `vietnamese`, đủ dấu tiếng Việt 100%)
- Canvas 1280×720, chữ to đọc rõ, tối giản lượng chữ mỗi slide

## Cấu trúc thư mục

```
├── src/
│   ├── app/                  # Next.js app router, layout + trang chính
│   ├── components/deck/      # 15 slide React (slides-a.tsx, slides-b.tsx)
│   └── lib/deck.ts           # Dữ liệu chung: agenda, stats, lịch trình, chi phí…
├── download/
│   ├── index.html            # Bản trình chiếu độc lập 1 file (kèm hiệu ứng nhảy chữ)
│   ├── slides/               # Nguồn 15 slide HTML tĩnh + global.css
│   └── Tour-du-lich-Nha-Trang.pptx
├── scripts/
│   └── build_index_html.py   # Build download/index.html từ download/slides/
├── prisma/ + db/             # Schema + SQLite
└── public/                   # Ảnh minh hoạ
```

## Build lại index.html

Sau khi sửa slide tĩnh trong `download/slides/`:

```bash
python3 scripts/build_index_html.py
```

## Ghi chú

- Số liệu phần Tiềm năng là **dự báo cho cả năm 2026**, chưa phải kết quả tổng kết cuối năm.
- `index.html` cần mạng để tải font Google, Material Icons và Tailwind CDN.
