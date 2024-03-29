import { generateRandomAvatar } from "./../utils/avatar/index";
import { isValidObjectId, Types } from "mongoose";
import User from "../models/user.model";
import { ICreateUser } from "../interfaces/createUser.interface";

class UserService {
  /** Fetch a single user from database using id*/
  async findById(id: Types.ObjectId) {
    return User.findById(id)
      .where("isDeleted")
      .equals(false)
      .select("-password");
  }

  /** Fetch a single user by username */
  async findByUsername(username: string) {
    return User.findOne({ username }).where("isDeleted").equals(false);
  }

  /** Fetch a single user by email */
  async findByEmail(email: string) {
    return User.findOne({ email }).where("isDeleted").equals(false);
  }

  /** Fetch a single user from database using id or username */
  async findOne(id: any) {
    const user = isValidObjectId(id)
      ? await this.findById(id)
      : await this.findByUsername(id);

    return user;
  }

  /** Fetch all users from database */
  async findAll() {
    return User.find({})
      .where("isDeleted")
      .equals(false)
      .select("-password")
      .lean();
  }

  /** Create a new user in database */
  async createUser(newUser: ICreateUser) {
    const { username, email, password } = newUser;
    const userExist = await User.findOne({ $or: [{ email }, { username }] });

    if (!userExist) {
      const avatarUrl = await generateRandomAvatar(email);

      return User.create({
        username,
        email,
        password,
        avatarUrl,
      });
    }

    throw new Error("user already exist");
  }

  /** Update a user info in database */
  async updateUser(id: Types.ObjectId, user: Partial<ICreateUser>) {
    const userExist = await this.findById(id);

    if (!userExist) throw new Error("user not found");

    if (Object.keys(user).length === 0)
      throw new Error("please provide field(s) to update");

    const avatarUrl = await generateRandomAvatar(userExist.email);

    return User.findByIdAndUpdate(id, { ...user, avatarUrl });
  }

  /** delete a user in database */
  async deleteUser(id: Types.ObjectId) {
    const userExist = await User.findById(id);

    if (!userExist) throw new Error("user not found");

    return User.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}

export const userService = new UserService();
