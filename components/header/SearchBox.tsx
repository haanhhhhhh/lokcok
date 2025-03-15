'use client';

import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import useSWR from 'swr';

export const SearchBox = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const router = useRouter();

  const [formCategory, setFormCategory] = useState(category);
  const [formQuery, setFormQuery] = useState(q);
  const [isFocused, setIsFocused] = useState(false);

  const {
    data: categories,
    error,
    isLoading,
  } = useSWR('/api/products/categories');

  if (error) return error.message;

  if (isLoading) return <div className='skeleton flex h-12 w-[400px] rounded-full'></div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuery.trim()) return;
    router.push(`/search?category=${formCategory}&q=${formQuery}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className={`flex w-[400px] items-center gap-2 rounded-full bg-base-200 px-4 py-2 transition-all duration-200 ${isFocused ? 'ring-2 ring-primary' : ''}`}>
        <select
          name='category'
          defaultValue={formCategory}
          aria-label='Category'
          className='select select-ghost max-w-[100px] !outline-none'
          onChange={(e) => setFormCategory(e.target.value)}
        >
          <option value='all'>Tất Cả</option>
          {categories?.map((c: string) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        
        <span className="h-6 w-[1px] bg-base-content/20"></span>
        
        <div className="flex flex-1 items-center gap-2">
          <input
            className='input input-ghost w-full !outline-none placeholder:text-base-content/50'
            placeholder='Tìm kiếm sản phẩm...'
            aria-label='Search'
            defaultValue={q}
            name='q'
            onChange={(e) => setFormQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button 
            className='btn btn-circle btn-ghost btn-sm'
            type='submit'
            aria-label="Tìm kiếm"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isFocused && formQuery.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg bg-base-200 p-2 shadow-lg">
          <div className="text-sm text-base-content/70">
            Gợi ý tìm kiếm cho "{formQuery}"
          </div>
          {/* TODO: Thêm gợi ý tìm kiếm */}
        </div>
      )}
    </form>
  );
};
