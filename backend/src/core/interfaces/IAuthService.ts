export interface IAuthService {
    hashPassword(password: string): Promise<string>;
    comparePassword(plain: string, hashed: string): Promise<boolean>;
    generateAccessToken(userId: string): Promise<string>;
    generateRefreshToken(userId: string): Promise<string>;
    

  }
  