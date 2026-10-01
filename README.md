# NORMA CLASS — Trò Chơi Mô Phỏng Giáo Dục

Dự án mô phỏng giáo dục xây dựng bằng React 19 + TypeScript + Vite + Tailwind CSS v4.

## Yêu cầu hệ thống
- Node.js ≥ 20
- npm hoặc pnpm / yarn

## Hướng dẫn cài đặt & khởi chạy

1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

2. **Chạy môi trường phát triển (Dev server):**
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại [http://localhost:5173](http://localhost:5173) (hoặc truy cập từ điện thoại qua IP hiển thị trên terminal).

3. **Đóng gói sản phẩm (Build production):**
   ```bash
   npm run build
   ```
   Kết quả xuất ra thư mục `dist/`. Chạy thử bản build bằng lệnh:
   ```bash
   npm run preview
   ```

## Cấu trúc thư mục

```
Design Game/
├── docs/                # Tài liệu thiết kế trò chơi (GDD)
│   └── NORMA_CLASS_GDD.md
├── src/
│   ├── game/            # Toàn bộ logic trò chơi
│   │   ├── Certificate.tsx  # Cấp chứng chỉ & in ấn
│   │   ├── data.ts          # Dữ liệu kịch bản, câu hỏi, điểm số
│   │   ├── Home.tsx         # Màn hình chọn chế độ
│   │   ├── Mode1.tsx        # Chế độ Khởi Nghiệp Giáo Dục
│   │   ├── Mode2.tsx        # Chế độ Mô Phỏng Lớp Học
│   │   └── ui.tsx           # Thành phần giao diện dùng chung
│   ├── App.tsx          # Điều hướng chính giữa các màn hình
│   ├── index.css        # Cấu hình Tailwind CSS v4 & theme
│   └── main.tsx         # Điểm khởi động ứng dụng React
├── index.html           # HTML shell
├── package.json         # Danh sách thư viện và scripts
├── tsconfig.json        # Cấu hình TypeScript
└── vite.config.ts       # Cấu hình Vite tiêu chuẩn
```
