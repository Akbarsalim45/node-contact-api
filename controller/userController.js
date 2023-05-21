//register
import User from "../models/userModels.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email && !password) {
    res.status(400);
    throw new Error("missing user info");
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(401);
    throw new Error("email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("hashedPassword", hashedPassword);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(200).json({
    message: "user created succesfully",
    user: {
      username: newUser.username,
      email: newUser.email,
      id: newUser._id,
    },
  });
});
//login

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    res.status(400);
    throw new Error("Email and password is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  const verifyPassword = await bcrypt.compare(password, user.password);

  if (verifyPassword) {
    const token = jwt.sign(
      { username: user.username, email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    res.status(200).json({ message: "user login succesfully", token });

    console.log("token", token);
  } else {
    res.status(401);
    throw new Error("Passwords do not match");
  }
});
//current

export const currentUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  res.json({ message: "user fetched succesfully", user: req.user });
});
