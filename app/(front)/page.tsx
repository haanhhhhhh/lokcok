import { Metadata } from 'next';
import { Suspense } from 'react';

import BannerSlider from '@/app/components/BannerSlider';
import Categories from '@/components/categories/Categories';
import ProductItemClient from '@/components/products/ProductItemClient';
import ProductItems, { ProductItemsSkeleton } from '@/components/products/ProductItems';
import ReadMore from '@/components/readMore/ReadMore';
import Text from '@/components/readMore/Text';
import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'LokCok - Sàn Thương Mại KOLs/KOCs Pass Items',
  description:
    'LokCok - Nền tảng mua bán đồ đã qua sử dụng của KOLs và KOCs hàng đầu Việt Nam. Authentic 100%, có chứng nhận nguồn gốc từ KOLs/KOCs.',
};

const HomePage = async () => {
  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();

  return (
    <div className='my-8 flex flex-col gap-4 md:gap-16'>
      <BannerSlider />
      
      <div className='flex flex-col gap-8 md:flex-row'>
        <div className='flex-1'>
          <p className='text-nowrap text-4xl font-semibold md:text-6xl'>
            Authentic/ <br /> Độc Quyền.
          </p>
        </div>
        <div className='flex flex-1 items-center'>
          <div>
            <span className='font-bold'>LokCok</span> là nền tảng mua bán đồ đã qua sử dụng của{' '}
            <span className='font-semibold text-primary'>KOLs</span> và{' '}
            <span className='font-semibold text-primary'>KOCs</span> hàng đầu Việt Nam.{' '}
            <br className='hidden sm:inline' />
            Tất cả sản phẩm đều có chứng nhận nguồn gốc và được kiểm duyệt kỹ càng.
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        <div className='card bg-base-200'>
          <div className='card-body'>
            <h3 className='card-title'>100% Authentic</h3>
            <p>Mọi sản phẩm đều có chứng nhận nguồn gốc từ KOLs/KOCs</p>
          </div>
        </div>
        <div className='card bg-base-200'>
          <div className='card-body'>
            <h3 className='card-title'>Độc Quyền</h3>
            <p>Items limited edition và các món đồ được KOLs/KOCs sử dụng trong content</p>
          </div>
        </div>
        <div className='card bg-base-200'>
          <div className='card-body'>
            <h3 className='card-title'>An Toàn</h3>
            <p>Thanh toán đảm bảo, kiểm tra hàng trước khi nhận</p>
          </div>
        </div>
      </div>

      <Categories />

      <Suspense
        fallback={<ProductItemsSkeleton qty={8} name='Sản Phẩm Mới' />}
      >
        <ProductItems />
      </Suspense>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-4">
          <h2 className="py-4 text-2xl font-bold">Sản Phẩm Nổi Bật</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductItemClient key={product._id} product={convertDocToObj(product)} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="py-4 text-2xl font-bold">Mới Về</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {latestProducts.map((product) => (
              <ProductItemClient key={product._id} product={convertDocToObj(product)} />
            ))}
          </div>
        </div>
      </div>

      <ReadMore>
        <Text />
      </ReadMore>
    </div>
  );
};

export default HomePage;
