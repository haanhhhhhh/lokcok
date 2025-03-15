import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

export const POST = async (request: NextRequest) => {
  try {
    const { name, email, password } = await request.json();
    console.log('Đang xử lý đăng ký cho email:', email);
    
    await dbConnect();
    console.log('Đã kết nối database thành công');

    // Kiểm tra email đã tồn tại
    const existingUser = await UserModel.findOne({ email });
    console.log('Kết quả kiểm tra email tồn tại:', existingUser);
    
    if (existingUser) {
      console.log('Email đã tồn tại trong database');
      return Response.json(
        { message: 'Email đã được sử dụng' },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log('Đã tạo user mới thành công');
    
    return Response.json(
      { message: 'Tạo tài khoản thành công' },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    console.error('Lỗi khi đăng ký:', err);
    return Response.json(
      { message: 'Có lỗi xảy ra khi đăng ký' },
      {
        status: 500,
      }
    );
  }
};
