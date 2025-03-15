'use client';

import { Eye, EyeOff, Facebook, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  const params = useSearchParams();
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);

  let callbackUrl = params.get('callbackUrl') || '/';
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (session?.user) {
      if (session.user.isAdmin) {
        router.push('/admin/dashboard');
      } else {
        router.push(callbackUrl);
      }
    }
  }, [callbackUrl, router, session, params]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form;
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (err: any) {
      console.error('Đăng nhập thất bại:', err);
    }
  };

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4'>
      <div className='card w-full max-w-md bg-base-300 shadow-xl'>
        <div className='card-body p-8'>
          <div className="text-center mb-8">
            <h1 className='text-3xl font-bold mb-2'>Chào mừng trở lại!</h1>
            <p className="text-base-content/60">Đăng nhập để tiếp tục mua sắm</p>
          </div>

          {params.get('error') && (
            <div className='alert alert-error shadow-lg mb-6'>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{params.get('error') === 'CredentialsSignin'
                ? 'Email hoặc mật khẩu không đúng'
                : params.get('error')}</span>
            </div>
          )}
          
          {params.get('success') && (
            <div className='alert alert-success shadow-lg mb-6'>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{params.get('success')}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => signIn('google', { callbackUrl })}
              className="btn btn-outline gap-2 hover:bg-white hover:text-black normal-case relative overflow-hidden group"
            >
              <div className="w-5 h-5 relative">
                <Image 
                  src="/images/google.svg" 
                  alt="Google" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              Google
            </button>

            <button
              type="button"
              onClick={() => signIn('facebook', { callbackUrl })}
              className="btn gap-2 normal-case bg-[#1877F2] text-white hover:bg-[#0C63D4]"
            >
              <Facebook className="h-5 w-5" />
              Facebook
            </button>
          </div>

          <div className="divider text-xs text-base-content/50 before:bg-base-content/10 after:bg-base-content/10">hoặc đăng nhập với email</div>

          <form onSubmit={handleSubmit(formSubmit)} className="space-y-6 mt-6">
            <div className='form-control'>
              <label className='label' htmlFor='email'>
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <input
                  type='text'
                  id='email'
                  {...register('email', {
                    required: 'Vui lòng nhập email',
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: 'Email không hợp lệ',
                    },
                  })}
                  className='input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-100'
                  placeholder="email@example.com"
                />
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/50" />
              </div>
              {errors.email?.message && (
                <label className='label'>
                  <span className='label-text-alt text-error'>{errors.email.message}</span>
                </label>
              )}
            </div>

            <div className='form-control'>
              <label className='label' htmlFor='password'>
                <span className="label-text font-medium">Mật Khẩu</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  {...register('password', {
                    required: 'Vui lòng nhập mật khẩu',
                  })}
                  className='input input-bordered w-full pr-10 bg-base-200/50 focus:bg-base-100'
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password?.message && (
                <label className='label'>
                  <span className='label-text-alt text-error'>{errors.password.message}</span>
                </label>
              )}
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary w-full'
            >
              {isSubmitting && (
                <span className='loading loading-spinner'></span>
              )}
              Đăng Nhập
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-base-content/60 text-sm">
              Chưa có tài khoản?{' '}
              <Link 
                className='link link-primary link-hover font-medium' 
                href={`/register?callbackUrl=${callbackUrl}`}
              >
                Đăng Ký Ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
