import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
const verifyToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log("token", token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("Invalid token");
      }
      req.user = decode;
      next();
    });
  } else {
    res.status(401);
    throw new Error("Token not provided");
  }
});

export default verifyToken;
