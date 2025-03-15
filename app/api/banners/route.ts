import dbConnect from '@/lib/dbConnect';
import BannerModel from '@/lib/models/BannerModel';

// GET all active banners
export async function GET() {
  try {
    await dbConnect();
    const banners = await BannerModel.find({ isActive: true }).sort({ order: 1 });
    return Response.json(banners);
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
} 