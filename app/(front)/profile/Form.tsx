'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: string;
};

const Form = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      avatar: '',
    },
  });

  useEffect(() => {
    if (session && session.user) {
      setValue('name', session.user.name!);
      setValue('email', session.user.email!);
      setValue('avatar', session.user.avatar || '');
    }
  }, [router, session, setValue]);

  const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const toastId = toast.loading('Đang tải ảnh lên...');
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const resSign = await fetch('/api/cloudinary-sign', {
        method: 'POST',
      });
      const { signature, timestamp } = await resSign.json();
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await res.json();
      setValue('avatar', data.secure_url);
      toast.success('Tải ảnh lên thành công', {
        id: toastId,
      });
    } catch (err: any) {
      toast.error(err.message, {
        id: toastId,
      });
    } finally {
      setUploading(false);
    }
  };

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password, avatar } = form;
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar,
        }),
      });
      if (res.status === 200) {
        toast.success('Cập nhật hồ sơ thành công');
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            name,
            email,
            avatar,
          },
        };
        await update(newSession);
      } else {
        const data = await res.json();
        toast.error(data.message || 'error');
      }
    } catch (err: any) {
      const error =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(error);
    }
  };

  return (
    <div className='card mx-auto my-4 max-w-sm bg-base-300'>
      <div className='card-body'>
        <h1 className='card-title'>Hồ Sơ</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className='my-4 flex flex-col items-center gap-4'>
            <div className='avatar'>
              <div className='w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
                <Image
                  src={getValues('avatar') || '/images/default-avatar.png'}
                  alt={getValues('name')}
                  width={96}
                  height={96}
                  className='rounded-full'
                />
              </div>
            </div>
            <input
              type='file'
              className='file-input file-input-bordered w-full max-w-xs'
              onChange={uploadHandler}
              disabled={uploading}
              accept='image/*'
            />
          </div>

          <div className='my-2'>
            <label className='label' htmlFor='name'>
              Tên
            </label>
            <input
              type='text'
              id='name'
              {...register('name', {
                required: 'Vui lòng nhập tên',
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.name?.message && (
              <div className='text-error'>{errors.name.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='email'>
              Email
            </label>
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
              className='input input-bordered w-full max-w-sm'
            />
            {errors.email?.message && (
              <div className='text-error'>{errors.email.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='password'>
              Mật Khẩu Mới
            </label>
            <input
              type='password'
              id='password'
              {...register('password', {})}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.password?.message && (
              <div className='text-error'>{errors.password.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='confirmPassword'>
              Xác Nhận Mật Khẩu Mới
            </label>
            <input
              type='password'
              id='confirmPassword'
              {...register('confirmPassword', {
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || 'Mật khẩu không khớp!';
                },
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.confirmPassword?.message && (
              <div className='text-error'>{errors.confirmPassword.message}</div>
            )}
          </div>

          <div className='my-2'>
            <button
              type='submit'
              disabled={isSubmitting || uploading}
              className='btn btn-primary w-full'
            >
              {(isSubmitting || uploading) && (
                <span className='loading loading-spinner'></span>
              )}
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
