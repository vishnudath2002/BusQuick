import { Request, Response } from "express";
import { RegisterUser } from "../../core/usecases/RegisterUser";
import { LoginUser } from "../../core/usecases/LoginUser";
import { VerifyUser } from "../../core/usecases/VerifyUser";

export class AuthController {
  constructor(
    private registerUser: RegisterUser,
    private loginUser: LoginUser,
    private verifyUser: VerifyUser
  ) {}

  async register(req: Request, res: Response) {
    try {
      const { name, email, password, phone, role } = req.body;
      await this.registerUser.execute(name, email, password, phone, role);
      res.status(201).send({ message: "User registered successfully" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(400).send({ message: "An unknown error occurred" });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.loginUser.execute(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(400).send({ message: "An unknown error occurred" });
      }
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const { otp, email } = req.body;
      await this.verifyUser.execute(otp, email);
      res.status(201).send({ message: "OTP verified successfully" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(400).send({ message: "An unknown error occurred" });
      }
    }
  }
}
