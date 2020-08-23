import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import UserDTO from "../dto/UserDTO";
import User from "../model/User";
import AppError from "../error/AppError";

export default class UserService {

  public async createUser({ name, email, password, passwordConfirmation }: UserDTO): Promise<UserDTO> {
    const userRepository = getRepository(User);

    if (password != passwordConfirmation) {
      throw new AppError("Password and Password Confirmatioin invalid.");
    }

    const checkUserExist = await userRepository.findOne({ where: { email } });

    if (checkUserExist) {
      throw new AppError("Email address already used.");
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({ name, email, password: hashedPassword });
    await userRepository.save(user);

    delete user.password;

    return user;
  }
}
