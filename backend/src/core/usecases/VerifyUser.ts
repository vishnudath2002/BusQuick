import { IOtpRepository } from "../interfaces/IOtpRepository";
import { IUserRepository } from "../interfaces/IUserRepository";

export class VerifyUser {
    constructor(private otpRepository: IOtpRepository, private userRepository: IUserRepository){}

    async execute(otp: string, email: string){
        const otpDoc = await this.otpRepository.findOtpByEmail(email);
        if(!otpDoc) throw new Error("OTP not found");

        if(otpDoc.otp !== otp || otpDoc.otp === null) throw new Error("OTP not found");

        const user = await this.userRepository.findByEmail(email);
        if(!user) throw new Error("User not found");

        user.otpVerified = true;
        await this.userRepository.save(user);

        await this.otpRepository.deleteOtpByEmail(email);

        return true;
        
    }

}