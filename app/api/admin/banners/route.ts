import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import BannerModel from '@/lib/models/BannerModel';

// GET all banners (admin only)
export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    );
  }

  try {
    await dbConnect();
    const banners = await BannerModel.find().sort({ order: 1 });
    return Response.json(banners);
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
}) as any;

// POST new banner (admin only)
export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    );
  }

  try {
    await dbConnect();
    const bannersCount = await BannerModel.countDocuments();
    
    if (bannersCount >= 10) {
      return Response.json(
        { message: 'Số lượng banner đã đạt tối đa (10)' },
        { status: 400 }
      );
    }

    const data = await req.json();
    const banner = new BannerModel({
      ...data,
      order: bannersCount,
    });
    await banner.save();
    return Response.json(banner);
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
}) as any; 