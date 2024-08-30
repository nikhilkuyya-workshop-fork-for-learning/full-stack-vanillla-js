import UserRepository from "../repository/userRepository.js";
import UserService from "../service/userService.js";
import { generateDBInstance } from "../util/db.js"

export const generateUserInsanctances = ({ dbPath }) => {
  const db = generateDBInstance(dbPath);
  const userRepository = new UserRepository({db});
  const userService = new UserService({userRepository});
  return userService;
}
