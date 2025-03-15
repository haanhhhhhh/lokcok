import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className='grid flex-1 place-items-center'>
      <div className='flex flex-col justify-center'>
        <h1 className='mb-4 text-xl font-semibold'>404 - Không tìm thấy trang</h1>
        <Link href='/' className='btn'>
          Về Trang Chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
