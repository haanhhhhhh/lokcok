import AdminLayout from '@/components/admin/AdminLayout';

import Dashboard from './Dashboard';

export const metadata = {
  title: 'Bảng Điều Khiển Quản Trị',
};

const DashbaordPage = () => {
  return (
    <AdminLayout activeItem='dashboard'>
      <Dashboard />
    </AdminLayout>
  );
};

export default DashbaordPage;
