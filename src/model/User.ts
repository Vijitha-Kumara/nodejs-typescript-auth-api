import mongoose from "mongoose";


export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}

const userMongoose = new mongoose.Schema<IUser>(
  {
    id: String,
    name: String,
    email: String,
    password: {
      type: String,
      select: false,
    },
    role: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userMongoose);
export default User;
