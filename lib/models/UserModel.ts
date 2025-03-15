import mongoose from 'mongoose';

export type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar?: string;
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: { type: Boolean, required: true, default: false },
    avatar: { type: String, default: '/images/default-avatar.png' },
  },
  { timestamps: true },
);

const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema);

export default UserModel;
