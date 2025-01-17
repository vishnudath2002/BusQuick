import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export class AuthService {
  

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }

  async generateAccessToken(userId: string): Promise<string> {
    return jwt.sign({id: userId},process.env.JWT_SECRET!, { expiresIn: "1d" })
  }

  async generateRefreshToken(userId: string): Promise<string> {
    return jwt.sign({id: userId},process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" })
  }

  

}
