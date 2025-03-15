'use client';

import { Eye, EyeOff, Facebook, Mail, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Form = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let callbackUrl = params.get('callbackUrl') || '/';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      router.push(
        `/signin?callbackUrl=${callbackUrl}&success=Đăng ký thành công!`
      );
    } catch (err: any) {
      console.error('Đăng ký thất bại:', err);
    }
  };

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4'>
      <div className='card w-full max-w-md bg-base-300 shadow-xl'>
        <div className='card-body p-8'>
          <div className="text-center mb-8">
            <h1 className='text-3xl font-bold mb-2'>Tạo tài khoản mới</h1>
            <p className="text-base-content/60">Tham gia cùng cộng đồng mua sắm của chúng tôi</p>
          </div>

          {params.get('error') && (
            <div className='alert alert-error shadow-lg mb-6'>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{params.get('error')}</span>
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

          <div className="divider text-xs text-base-content/50 before:bg-base-content/10 after:bg-base-content/10">hoặc đăng ký với email</div>

          <form onSubmit={handleSubmit(formSubmit)} className="space-y-6 mt-6">
            <div className='form-control'>
              <label className='label' htmlFor='name'>
                <span className="label-text font-medium">Họ Tên</span>
              </label>
              <div className="relative">
                <input
                  type='text'
                  id='name'
                  {...register('name', {
                    required: 'Vui lòng nhập họ tên',
                    minLength: {
                      value: 2,
                      message: 'Họ tên phải có ít nhất 2 ký tự',
                    },
                  })}
                  className='input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-100'
                  placeholder="Nguyễn Văn A"
                />
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/50" />
              </div>
              {errors.name?.message && (
                <label className='label'>
                  <span className='label-text-alt text-error'>{errors.name.message}</span>
                </label>
              )}
            </div>

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
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu phải có ít nhất 6 ký tự',
                    },
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

            <div className='form-control'>
              <label className='label' htmlFor='confirmPassword'>
                <span className="label-text font-medium">Xác Nhận Mật Khẩu</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='confirmPassword'
                  {...register('confirmPassword', {
                    required: 'Vui lòng xác nhận mật khẩu',
                    validate: (value) =>
                      value === watch('password') || 'Mật khẩu không khớp',
                  })}
                  className='input input-bordered w-full pr-10 bg-base-200/50 focus:bg-base-100'
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                  aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword?.message && (
                <label className='label'>
                  <span className='label-text-alt text-error'>
                    {errors.confirmPassword.message}
                  </span>
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
              Đăng Ký
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-base-content/60 text-sm">
              Đã có tài khoản?{' '}
              <Link 
                className='link link-primary link-hover font-medium' 
                href={`/signin?callbackUrl=${callbackUrl}`}
              >
                Đăng Nhập Ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
