import UserModel from "../models/User.model.js";

export default class UsersRepository {
  async findByEmail(email) { return UserModel.findOne({ email }); }
  async findById(id) { return UserModel.findById(id); }
  async create(data) { return UserModel.create(data); }
  async updatePassword(id, hashed) {
    return UserModel.findByIdAndUpdate(id, { password: hashed }, { new: true });
  }
}