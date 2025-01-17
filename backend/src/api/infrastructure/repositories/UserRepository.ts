import { IUserRepository } from "../../../core/interfaces/IUserRepository";
import { User } from "../../../core/entities/User";
import Users from "../db/models/Users";

export class UserRepository implements IUserRepository {
  async save(user: User): Promise<void> {
    const userToSave = new Users(user);
    await userToSave.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await Users.findOne({ email }).exec();

    // Map the Mongoose document to your User type
    if (!userDoc) {
      return null;
    }

    return {
      id: userDoc._id.toString(), // Convert _id to string
      name: userDoc.name || '',
      email: userDoc.email || '',
      password: userDoc.password || '',
      phone: userDoc.phone || '',
      role: userDoc.role || '',
      isBlocked: userDoc.isBlocked || false,
      otpVerified: userDoc.otpVerified || false,
    };
  }

  async findById(id: string): Promise<User | null> {
    const userDoc = await Users.findById(id).exec();

    // Map the Mongoose document to your User type
    if (!userDoc) {
      return null;
    }

    return {
      id: userDoc._id.toString(), 
      name: userDoc.name || '',
      email: userDoc.email || '',
      password: userDoc.password || '',
      phone: userDoc.phone || '',
      role: userDoc.role || '',
      isBlocked: userDoc.isBlocked || false,
      otpVerified: userDoc.otpVerified || false,
    };
  }

  async findByRole(role: string): Promise<User[] | null> {

    const userDocs = await Users.find({role});

    return userDocs.map((userDoc) => ({
      id: userDoc._id.toString(),
      name: userDoc.name || '',
      email: userDoc.email || '',
      password: userDoc.password || '',
      phone: userDoc.phone || '',
      role: userDoc.role || '',
      isBlocked: userDoc.isBlocked || false,
      otpVerified: userDoc.otpVerified || false,
    }));
    
  }

  async toggleBlockStatus(id: string): Promise<User | null> {
    const userDoc = await Users.findById(id).exec();

    if (!userDoc) {
      throw new Error("User not found.");
    }

    // Toggle the block status
    userDoc.isBlocked = !userDoc.isBlocked;

    // Save the updated user document
    await userDoc.save();

    // Map the updated document to your User type and return
    return {
      id: userDoc._id.toString(),
      name: userDoc.name || '',
      email: userDoc.email || '',
      password: userDoc.password || '',
      phone: userDoc.phone || '',
      role: userDoc.role || '',
      isBlocked: userDoc.isBlocked,
      otpVerified: userDoc.otpVerified || false,
    };
  }


}
