import { Router, Response, NextFunction, Request } from 'express';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import ToDoService from '../service/ToDoService';

const toDoRouter = Router();
const toDoService = new ToDoService();

toDoRouter.use(ensureAuthenticated);

toDoRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;

    const toDos = await toDoService.getToDosByUserId(userId);

    return res.json(toDos);
  } catch (ex) {
    return next(ex);
  }
});

toDoRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { description, isImportant, userId } = req.body;

    const toDo = await toDoService.createNewToDoByUserId({ userId, description, isImportant });

    return res.json(toDo);
  } catch (ex) {
    return next(ex);
  }
});

export default toDoRouter;
