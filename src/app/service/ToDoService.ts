import { getRepository } from "typeorm";
import ToDoDTO from "../dto/ToDoDTO";
import ToDo from "../model/ToDo";
import AppError from "../error/AppError";
import User from "../model/User";

export default class ToDoService {

  public async getToDos(userId: number): Promise<ToDo[]> {
    const toDoRepository = getRepository(ToDo);
    const todos = await toDoRepository.find({ where: { user_id: userId } });
    return (todos || []).map(todo => {
      delete todo.user;
      delete todo.user_id;
      return todo;
    });
  }

  public async getToDo(userId: number, toDoId: number): Promise<ToDo> {
    const toDoRepository = getRepository(ToDo);
    const todo = await toDoRepository.findOne({ where: { id: toDoId, user_id: userId } });

    if (!todo) {
      throw new AppError("ToDo not found.");
    }

    delete todo.user_id;

    return todo;
  }

  public async createNewToDo({ userId, description, isImportant }: ToDoDTO): Promise<ToDo> {
    const toDoRepository = getRepository(ToDo);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { id: userId } });
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

  public async deleteToDo(userId: number, toDoId: number): Promise<void> {
    const toDoRepository = getRepository(ToDo);

    const todo = await toDoRepository.findOne({ where: { id: toDoId, user_id: userId } });
    if (!todo) {
      throw new AppError("ToDo not found.", 204);
    }

    await toDoRepository.delete(toDoId);
  }

  public async markFinished(userId: number, toDoId: number, isCompleted: boolean): Promise<ToDo> {
    const toDoRepository = getRepository(ToDo);

    const todo = await toDoRepository.findOne({ where: { id: toDoId, user_id: userId } });
    if (!todo) {
      throw new AppError("ToDo not found.", 204);
    }

    todo.isCompleted = isCompleted;
    return await toDoRepository.save(todo);
  }

  public async updateToDo({ userId, id, description, isImportant }: ToDoDTO): Promise<ToDo> {
    const toDoRepository = getRepository(ToDo);

    const todo = await toDoRepository.findOne({ where: { id, user_id: userId } });
    if (!todo) {
      throw new AppError("ToDo not found.", 204);
    }

    if (!description) {
      throw new AppError("Description invalid.");
    }

    todo.description = description;
    todo.isImportant = isImportant;
    return await toDoRepository.save(todo);
  }
}
