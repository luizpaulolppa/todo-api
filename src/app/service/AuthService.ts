import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import UserDTO from "../dto/UserDTO";
import AuthDTO from "../dto/AuthDTO";
import User from "../model/User";
import AppError from "../error/AppError";
import authConfig from "../config/auth";

export default class AuthService {

  public async authUser({ email, password }: AuthDTO): Promise<{ user: UserDTO, token: string }> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    delete user.password;

    const token = sign({}, secret, {
      subject: `${user.id}`,
      expiresIn: expiresIn
    });

    return { user, token };
  }
}
