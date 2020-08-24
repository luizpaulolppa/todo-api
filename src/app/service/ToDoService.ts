import { getRepository } from "typeorm";
import ToDoDTO from "../dto/ToDoDTO";
import ToDo from "../model/ToDo";
import AppError from "../error/AppError";
import User from "../model/User";

export default class ToDoService {

  public async createNewToDoByUserId({ userId: id, description, isImportant }: ToDoDTO): Promise<ToDo> {
    const toDoRepository = getRepository(ToDo);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { id } });
    if (user) {
      throw new AppError("Use not found.");
    }

    if (!description) {
      throw new AppError("Description invalid.");
    }

    const toDo = toDoRepository.create({ description, isImportant, user });
    await toDoRepository.save(toDo);

    return toDo;
  }
}
