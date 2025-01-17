import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String,
  isBlocked: Boolean,
  otpVerified: Boolean,
});

const Users = mongoose.model("User", UserSchema);
export default Users;
