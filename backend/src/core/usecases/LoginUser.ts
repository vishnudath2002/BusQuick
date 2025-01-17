import { IUserRepository } from "../interfaces/IUserRepository";
import { IAuthService } from "../interfaces/IAuthService";
// import { IOtpService } from "../interfaces/IOtpService";
// import { IEmailService } from "../interfaces/IEmailService";
// import { User } from "../entities/User";
// import { IOtpRepository } from "../interfaces/IOtpRepository";

export class LoginUser {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  async execute(email: string, password: string) {
    // Check if user already exists
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      // User not found
      return { success: false, message: "User not found" };
    }

    if (user.isBlocked == true)
      return { success: false, message: "User Blocked" };

    if (!user.otpVerified)
      return { success: false, message: "User not verified" };

    if (!user.password) return { success: false, message: "Invalid password" };

    // Check if password matches
    const isMatched = await this.authService.comparePassword(
      password,
      user.password
    );

    if (!isMatched) {
      // Password mismatch
      return { success: false, message: "Password mismatch" };
    }

    // Generate authentication token or perform post-login operations
    const accessToken = await this.authService.generateAccessToken(user.id);

    const refreshToken = await this.authService.generateRefreshToken(user.id);

    return {
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
