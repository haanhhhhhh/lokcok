'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Banner } from '@/lib/models/BannerModel';

export default function BannerSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners');
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message);
        }
        const data = await res.json();
        setBanners(data);
      } catch (err: any) {
        console.error('Error fetching banners:', err.message);
      }
    };

    fetchBanners();
  }, []);

  if (banners.length === 0) return null;

  if (session.status === 'authenticated' && session.data?.user) {
    // Nếu user là admin, chuyển đến trang dashboard
    if (session.data.user.isAdmin) {
      router.push('/admin/dashboard');
    } else {
      router.push('/');
    }
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="aspect-[21/9] w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div className="relative h-full w-full">
              <Image
                src={banner.image}
                alt={banner.title || ''}
                fill
                className="object-cover"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 