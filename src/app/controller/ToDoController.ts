import { Router, Request, Response, NextFunction } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ToDoService from '../service/ToDoService';

const toDoRouter = Router();
const toDoService = new ToDoService();

toDoRouter.use(ensureAuthenticated);

toDoRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { description, isImportant } = req.body;
    const userId = Number(req.user.id);

    const toDo = await toDoService.createNewToDoByUserId({ userId, description, isImportant });

    return res.json(toDo);
  } catch (ex) {
    return next(ex);
  }
});

export default toDoRouter;
