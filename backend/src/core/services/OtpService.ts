import { IOtpService } from "../interfaces/IOtpService";

export class OtpService implements IOtpService {
  createOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  }

  // async saveOtp(email: string, otp: string): Promise<void> {
  //   // Logic to save OTP in the database
  // }
}
