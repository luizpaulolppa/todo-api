import { getRepository } from "typeorm";
import ToDoDTO from "../dto/ToDoDTO";
import ToDo from "../model/ToDo";
import AppError from "../error/AppError";
import User from "../model/User";

export default class ToDoService {

  public async getToDosByUserId(userId: number): Promise<ToDo[]> {
    const toDoRepository = getRepository(ToDo);
    const todos = await toDoRepository.find({ where: { user_id: userId } });
    return (todos || []).map(todo => {
      delete todo.user;
      delete todo.user_id;
      return todo;
    });
  }

  public async createNewToDoByUserId({ userId: id, description, isImportant }: ToDoDTO): Promise<ToDo> {
    const toDoRepository = getRepository(ToDo);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      throw new AppError("User not found.");
    }

    if (!description) {
      throw new AppError("Description invalid.");
    }

    const toDo = toDoRepository.create({ description, isImportant, user: user });
    await toDoRepository.save(toDo);

    delete toDo.user;
    delete toDo.user_id;

    return toDo;
  }
}
