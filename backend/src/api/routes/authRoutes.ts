import express from "express";
import { AuthController } from "../controllers/AuthController";
import { RegisterUser } from "../../core/usecases/RegisterUser";
import { LoginUser } from "../../core/usecases/LoginUser";
import { VerifyUser } from "../../core/usecases/VerifyUser";

import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { AuthService } from "../../core/services/AuthService";
import { OtpService } from "../../core/services/OtpService";
import { OtpRepository } from "../infrastructure/repositories/OtpRepository";
import { EmailService } from "../../core/services/EmailService";

const router = express.Router();
const userRepository = new UserRepository();
const authService = new AuthService();
const otpService = new OtpService();
const otpRepository = new OtpRepository();
const emailService = new EmailService();
const authController = new AuthController(
  new RegisterUser(
    userRepository,
    authService,
    otpService,
    otpRepository,
    emailService
  ),
  new LoginUser(userRepository, authService),
  new VerifyUser(otpRepository, userRepository)
);

router.post("/register", authController.register.bind(authController));

router.post("/login", authController.login.bind(authController));

router.post("/verify-otp", authController.verify.bind(authController));

export default router;
