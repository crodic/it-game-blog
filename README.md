# Blog Website

Đây là một dự án website blog được xây dựng bằng **Next.js 14**, **Prisma**, và **MongoDB**. Dự án cho phép người dùng đăng tải, chỉnh sửa và đọc các bài viết về anime, game và front-end.

## Công nghệ sử dụng

- **Next.js 14** (App Router)
- **Prisma** (ORM quản lý database)
- **MongoDB** (Cơ sở dữ liệu NoSQL)
- **Tailwind CSS** (Thiết kế giao diện)
- **Cloudinary** (Lưu trữ hình ảnh/video)
- **React Query (TanStack Query)** (Quản lý state phía client)

## Cách chạy dự án

### 1. Clone repo

```sh
git clone https://github.com/your-username/next-blogs.git
cd next-blogs
```

### 2. Cấu hình môi trường

Tạo file `.env` và thêm các biến sau:

```env
DATABASE_URL=""
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=""
NEXT_PUBLIC_CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

NEXT_PUBLIC_TINYMCE_API_KEY=""

SMTP_USER=""
SMTP_PASSWORD=""
SMTP_PORT=""
SMTP_HOST=""
SMTP_FROM='"Crodic Crystal" <your-email@gmail.com>'
```

### 3. Cài đặt dependencies

```sh
yarn install  # Hoặc npm install
```

### 4. Chạy dự án

- Chạy Prisma migration:

```sh
npx prisma db push
```

- Chạy server development:

```sh
yarn dev  # Hoặc npm run dev
```

Dự án sẽ chạy tại `http://localhost:3000`

## Deployment

Bạn có thể deploy project này lên **Vercel** dễ dàng:

```sh
vercel
```

Hoặc deploy lên **Railway** / **Render** để chạy với MongoDB Atlas.

## Tính năng chính

- [x] CRUD bài viết
- [x] CRUD danh mục
- [x] Thống kê
- [x] Dark mode
- [x] Tìm kiếm theo từ khoá
- [x] Responsive Web Design

## Liên hệ

Nếu bạn có bất kỳ câu hỏi nào, hãy mở issue hoặc liên hệ qua email: `alice01422@gmail.com`.

---

**Người phát triển:** Crodic Crystal - Biện Hồng Phát
