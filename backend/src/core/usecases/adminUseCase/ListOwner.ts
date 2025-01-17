
import { IUserRepository } from "../../interfaces/IUserRepository";
// import { PostComment } from "../entities/Post";

export class ListOwner {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute() {
    // Fetch owners
    const owners = await this.userRepository.findByRole("busOwner");

    if (!owners || owners.length === 0) {
      return { success: false, message: "No owners" };
    }

    return {
      success: true,
      message: "owners list fetched successfully",
      owners: owners,
    };
  }

  
}
