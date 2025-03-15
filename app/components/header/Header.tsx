'use client';

import Image from 'next/image';
import Link from 'next/link';

import useSearchVisible from '@/lib/hooks/useSearchVisible';

import Menu from './Menu';
import { SearchBox } from './SearchBox';

const Header = () => {
  const isSearchVisible = useSearchVisible();

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-xl">
      <div className="container mx-auto">
        <div className="navbar min-h-[4rem] gap-2 justify-between">
          {/* Logo */}
          <div className="flex-none">
            <Link href="/" className="btn btn-ghost flex items-center gap-3 px-2">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/logo.png"
                  alt="LokCok"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-tight">Fashion</span>
                <span className="text-xl font-bold leading-tight">Corner</span>
              </div>
            </Link>
          </div>

          {/* Menu */}
          <div className="flex-1 justify-center">
            <Menu />
          </div>

          {/* Search Box - Desktop */}
          {isSearchVisible && (
            <div className="flex-none">
              <div className="hidden w-full max-w-xl md:block">
                <SearchBox />
              </div>
            </div>
          )}
        </div>

        {/* Search Box - Mobile */}
        {isSearchVisible && (
          <div className="pb-4 md:hidden">
            <SearchBox />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 