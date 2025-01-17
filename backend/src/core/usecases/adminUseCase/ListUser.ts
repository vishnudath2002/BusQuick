
import { IUserRepository } from "../../interfaces/IUserRepository";
// import { PostComment } from "../entities/Post";

export class ListUser {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute() {
    // Fetch users
    const users = await this.userRepository.findByRole("user");

    if (!users || users.length === 0) {
      return { success: false, message: "No users" };
    }

  

    return {
      success: true,
      message: "users list fetched successfully",
      users: users,
    };
  }

  
}
