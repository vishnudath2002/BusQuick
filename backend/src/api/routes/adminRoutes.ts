import express from "express";
import { AdminController } from "../controllers/adminController";
import { ListOwner } from "../../core/usecases/adminUseCase/listOwner";
import { ListUser } from "../../core/usecases/adminUseCase/listUser";
import { LoginAdmin } from "../../core/usecases/adminUseCase/loginAdmin";
import { ToggleBlockStatus } from "../../core/usecases/adminUseCase/toggleBlockStatus";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { AdminRepository } from "../infrastructure/repositories/AdminRepository";
import { AuthService } from "../../core/services/AuthService";


const userRepository = new UserRepository();
const adminRepository = new AdminRepository();
const authService = new AuthService();

// Create the AdminController instance
const adminController = new AdminController(
  new LoginAdmin(adminRepository, authService),
  new ListUser(userRepository),
  new ListOwner(userRepository),
  new ToggleBlockStatus(userRepository)
);

// Initialize the router
const router = express.Router();

// Define routes with bound controller methods
router.post("/login", adminController.login.bind(adminController));
router.get("/userlist", adminController.getUserList.bind(adminController));
router.get("/ownerlist", adminController.getOwnerList.bind(adminController));
router.post(
  "/toggle-block/:userId",
  adminController.toggleBlock.bind(adminController)
);

export default router;
