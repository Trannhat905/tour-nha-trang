import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const bvp = Be_Vietnam_Pro({
  variable: "--font-bvp",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tour Du Lịch Nha Trang — 3 Ngày 2 Đêm",
  description:
    "Bài thuyết trình nhóm 4: Thiết kế tour du lịch Nha Trang 3 ngày 2 đêm — biển xanh, cát trắng, nắng vàng. Nhóm 4 thực hiện: Kỳ Anh, Minh Nhật, Anh Thư, Thanh Nguyên.",
  keywords: ["Nha Trang", "tour du lịch", "thuyết trình", "3 ngày 2 đêm", "Khánh Hòa"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Tour Du Lịch Nha Trang — 3 Ngày 2 Đêm",
    description: "Khám phá viên ngọc xanh của biển Đông",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a3d62",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className={bvp.variable}>
      <body className={`${bvp.variable} antialiased`}>{children}</body>
    </html>
  );
}
