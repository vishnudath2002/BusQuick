import { IUserRepository } from "../interfaces/IUserRepository";
import { IAuthService } from "../interfaces/IAuthService";
import { IOtpService } from "../interfaces/IOtpService";
import { IEmailService } from "../interfaces/IEmailService";
import { User } from "../entities/User";
import { IOtpRepository } from "../interfaces/IOtpRepository";

export class RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService,
    private otpService: IOtpService,
    private otpRepository: IOtpRepository,
    private emailService: IEmailService
  ) {}

  async execute(name: string, email: string, password: string, phone: string, role: string) {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new Error("User already exists");

    // Hash the password
    const hashedPassword = await this.authService.hashPassword(password);

    // Create a new user entity
    const user = new User('', name, email, hashedPassword, phone, role);
    await this.userRepository.save(user);

    // Generate OTP
    const otp = this.otpService.createOtp();
    

    // Save OTP
    await this.otpRepository.save({email,otp});

    // Send OTP via email
    const subject = 'Your OTP Code';
    const text = `Your OTP code is: ${otp}`;
    await this.emailService.sendEmail(email, subject, text);

    return { success: true, message: 'User registered successfully! Please verify your OTP.' };
  }
}
