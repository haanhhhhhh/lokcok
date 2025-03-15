import AdminLayout from '@/components/admin/AdminLayout';

import Users from './Users';

export const metadata = {
  title: 'Quản Lý Người Dùng',
};

const UsersPage = () => {
  return (
    <AdminLayout activeItem='users'>
      <Users />
    </AdminLayout>
  );
};

export default UsersPage;
