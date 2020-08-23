import ToDoDTO from "../dto/ToDoDTO";

export default class ToDoService {

  public async createNewToDoByUserId({ userId, description, isImportant }: ToDoDTO): Promise<Todo> {

  }
}
