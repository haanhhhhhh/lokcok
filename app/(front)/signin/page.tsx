import { Metadata } from 'next';

import Form from './Form';

export const metadata: Metadata = {
  title: 'Đăng Nhập',
};

const SignInPage = async () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default SignInPage;
