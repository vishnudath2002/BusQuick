// import jwt from "jsonwebtoken";
import {  Response, NextFunction } from "express";
import { verifyToken } from "../../infrastructure/security/token";







// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message : "Unauthorized, no token provided" });
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(401).json({ message : "Unauthorized, invalid token" });
  }
};
