'use client';

import { usePathname } from 'next/navigation';

export default function useSearchVisible() {
  const pathname = usePathname();

  // Danh sách các trang cần hiển thị thanh tìm kiếm
  const searchVisiblePaths = [
    '/', // Trang chủ
    '/search', // Trang kết quả tìm kiếm
    '/category', // Trang danh mục
    '/products', // Trang sản phẩm
  ];

  // Kiểm tra xem pathname hiện tại có bắt đầu bằng một trong các path cần hiển thị không
  return searchVisiblePaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  );
} 