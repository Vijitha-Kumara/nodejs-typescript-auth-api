import mongoose from "mongoose";
const userMongoose =new mongoose.Schema(
{
  name: String,
  email: String,
  password: String,
  role: String,
  isActive:Boolean
},
   { timestamps: true }

)

const User =mongoose.model("User",userMongoose);
export default User;
