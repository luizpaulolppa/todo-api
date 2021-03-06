import { Router, Response, NextFunction, Request } from 'express';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import ToDoService from '../service/ToDoService';
import ToDo from '../model/ToDo';

const toDoRouter = Router();
const toDoService = new ToDoService();

toDoRouter.use(ensureAuthenticated);

toDoRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    const { completed } = req.query;

    let toDos: ToDo[] = [];
    if (completed === "true") {
      toDos = await toDoService.getToDos({ userId, completed: true });
    } else if (completed === "false") {
      toDos = await toDoService.getToDos({ userId, completed: false });
    } else {
      toDos = await toDoService.getToDos({ userId });
    }

    return res.json(toDos);
  } catch (ex) {
    return next(ex);
  }
});

toDoRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    const toDos = await toDoService.getToDo(userId, Number(id));

    return res.json(toDos);
  } catch (ex) {
    return next(ex);
  }
});

toDoRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { description, isImportant, userId } = req.body;

    const toDo = await toDoService.createNewToDo({ description, isImportant, userId });

    return res.json(toDo);
  } catch (ex) {
    return next(ex);
  }
});

toDoRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { description, isImportant, userId } = req.body;
    const { id } = req.params;

    const toDo = await toDoService.updateToDo({ userId, id: Number(id), description, isImportant });

    return res.json(toDo);
  } catch (ex) {
    return next(ex);
  }
});

toDoRouter.patch("/:id/finished", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    const toDo = await toDoService.markFinished(userId, Number(id), true);

    return res.json(toDo);
  } catch (ex) {
    return next(ex);
  }
});

toDoRouter.patch("/:id/unfinished", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    const toDo = await toDoService.markFinished(userId, Number(id), false);

    return res.json(toDo);
  } catch (ex) {
    return next(ex);
  }
});

toDoRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    await toDoService.deleteToDo(userId, Number(id));

    return res.status(200).json({ isDeleted: true });
  } catch (ex) {
    return next(ex);
  }
});

export default toDoRouter;
