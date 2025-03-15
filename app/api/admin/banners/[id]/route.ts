import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import BannerModel from '@/lib/models/BannerModel';

// PUT update banner
export const PUT = auth(async (req: any, context: any) => {
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
    const data = await req.json();
    const banner = await BannerModel.findByIdAndUpdate(
      context.params.id,
      data,
      { new: true }
    );
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

// DELETE banner
export const DELETE = auth(async (req: any, context: any) => {
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
    const banner = await BannerModel.findByIdAndDelete(context.params.id);
    
    // Reorder remaining banners
    await BannerModel.updateMany(
      { order: { $gt: banner.order } },
      { $inc: { order: -1 } }
    );
    
    return Response.json({ message: 'Banner đã được xóa' });
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
}) as any; 