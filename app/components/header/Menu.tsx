'use client';

import { ChevronDown, Moon, ShoppingCart, Sun, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';

import useCartService from '@/lib/hooks/useCartStore';
import useLayoutService from '@/lib/hooks/useLayout';

const Menu = () => {
  const { items, init } = useCartService();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useLayoutService();

  const signOutHandler = () => {
    signOut({ callbackUrl: '/signin' });
    init();
  };

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="hidden md:flex items-center gap-6">
        <Link href="/products" className="hover:text-primary transition-colors">
          Sản Phẩm
        </Link>
        <Link href="/about" className="hover:text-primary transition-colors">
          Về Chúng Tôi
        </Link>
        <Link href="/contact" className="hover:text-primary transition-colors">
          Liên Hệ
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="btn btn-circle btn-ghost btn-sm"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}
        >
          {theme === 'light' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        <Link
          href="/cart"
          className="btn btn-circle btn-ghost btn-sm relative"
          aria-label="Giỏ hàng"
        >
          <ShoppingCart className="h-4 w-4" />
          {items.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-content">
              {items.reduce((a, c) => a + c.qty, 0)}
            </span>
          )}
        </Link>

        {session?.user ? (
          <div className="dropdown dropdown-end">
            <label 
              tabIndex={0} 
              className="btn btn-circle btn-ghost avatar online cursor-pointer"
            >
              <div className="w-8 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <Image
                  src={session.user.avatar || '/images/default-avatar.png'}
                  alt={session.user.name || ''}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] mt-2 w-52 rounded-box bg-base-200 p-2 shadow-lg"
            >
              {session.user.isAdmin && (
                <>
                  <li className="menu-title">
                    <span>Quản trị</span>
                  </li>
                  <li onClick={handleClick}>
                    <Link href="/admin/dashboard" className="gap-2">
                      <span className="text-primary">Dashboard</span>
                    </Link>
                  </li>
                  <li onClick={handleClick}>
                    <Link href="/admin/banners" className="gap-2">
                      <span>Quản Lý Banner</span>
                    </Link>
                  </li>
                  <div className="divider my-1"></div>
                </>
              )}

              <li className="menu-title">
                <span>Tài khoản</span>
              </li>
              <li onClick={handleClick}>
                <Link href="/order-history" className="gap-2">
                  Lịch Sử Đơn Hàng
                </Link>
              </li>
              <li onClick={handleClick}>
                <Link href="/profile" className="gap-2">
                  Hồ Sơ
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li onClick={handleClick}>
                <button 
                  type="button" 
                  onClick={signOutHandler}
                  className="text-error"
                >
                  Đăng Xuất
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="btn btn-primary btn-sm gap-2 rounded-full normal-case"
            type="button"
            onClick={() => signIn()}
          >
            <User className="h-4 w-4" />
            Đăng Nhập
          </button>
        )}
      </div>
    </div>
  );
};

export default Menu; 