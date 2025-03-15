import BannerList from './BannerList';

export const metadata = {
  title: 'Quản Lý Banner',
};

export default function AdminBannersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-2xl font-bold">Quản Lý Banner</h1>
      <BannerList />
    </div>
  );
} 