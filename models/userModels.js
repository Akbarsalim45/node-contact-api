import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is requiered"],
    },
    email: {
      type: String,
      required: [true, "email is requiered"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is requiered"],
    },
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);

export default User;
