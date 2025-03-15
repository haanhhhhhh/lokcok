'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const AdminSidebar = () => {
  const pathname = usePathname();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    setSidebarVisible(false);
  }, [pathname]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <div className="drawer-overlay"></div>
      <button
        className="btn btn-circle btn-ghost drawer-button lg:hidden fixed right-4 top-4 z-50"
        onClick={toggleSidebar}
      >
        {sidebarVisible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      <ul
        className={`menu p-4 text-base-content fixed top-0 left-0 h-full w-80 bg-base-200 lg:bg-transparent ${
          sidebarVisible ? '' : 'hidden'
        } space-y-2 lg:block z-40`}
      >
        <li>
          <Link
            href="/admin/dashboard"
            className={`${pathname === '/admin/dashboard' && 'active'}`}
          >
            Bảng Điều Khiển
          </Link>
        </li>
        <li>
          <Link
            href="/admin/orders"
            className={`${pathname === '/admin/orders' && 'active'}`}
          >
            Đơn Hàng
          </Link>
        </li>
        <li>
          <Link
            href="/admin/products"
            className={`${pathname === '/admin/products' && 'active'}`}
          >
            Sản Phẩm
          </Link>
        </li>
        <li>
          <Link
            href="/admin/users"
            className={`${pathname === '/admin/users' && 'active'}`}
          >
            Người Dùng
          </Link>
        </li>
        <li>
          <Link
            href="/admin/banners"
            className={`${pathname === '/admin/banners' && 'active'}`}
          >
            Banner
          </Link>
        </li>
        <li>
          <button onClick={() => signOut({ callbackUrl: '/signin' })}>
            Đăng Xuất
          </button>
        </li>
      </ul>
    </>
  );
};

export default AdminSidebar; 