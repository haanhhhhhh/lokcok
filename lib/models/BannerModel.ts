import mongoose from 'mongoose';

export type Banner = {
  _id: string;
  image: string;
  title?: string;
  isActive: boolean;
  order: number;
};

const BannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const BannerModel = mongoose.models?.Banner || mongoose.model('Banner', BannerSchema);

export default BannerModel; 