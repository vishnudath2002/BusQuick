import { Request, Response } from "express";
import { ListOwner } from "../../core/usecases/adminUseCase/listOwner";
import { ListUser } from "../../core/usecases/adminUseCase/listUser";
import { LoginAdmin } from "../../core/usecases/adminUseCase/loginAdmin";
import { ToggleBlockStatus } from "../../core/usecases/adminUseCase/toggleBlockStatus";

export class AdminController {

  constructor(
    private loginAdmin:  LoginAdmin,
    private listUser: ListUser,
    private listOwner: ListOwner,
    private toggleBlockStatus: ToggleBlockStatus
  ) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const admin = await this.loginAdmin.execute( email , password );
      res.cookie("adminRefreshToken", admin.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(201).json(admin);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(400).send({ message: "An unknown error occurred" });
      }
    }
  }

  async getUserList(req: Request, res: Response) {
    try {
      const users = await this.listUser.execute();
      res.status(201).json(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(400).send({ message: "An unknown error occurred" });
      }
    }
  }

  async getOwnerList(req: Request, res: Response) {
    try {
      const owners = await this.listOwner.execute();
      res.status(201).json(owners);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(400).send({ message: "An unknown error occurred" });
      }
    }
  }

  async toggleBlock(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const result = await this.toggleBlockStatus.execute(userId);
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(400).send({ message: "An unknown error occurred" });
      }
    }
  }
}
