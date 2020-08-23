import { Router, Request, Response } from 'express';
import UserService from '../service/UserService';

const usersRouter = Router();
const userService = new UserService();

usersRouter.get("/", (req: Request, res: Response) => {
  return res.json([]);
});

usersRouter.post("/", async (req: Request, res: Response) => {
  const { name, email, password, passwordConfirmation } = req.body;

  const user = await userService.createUser({ name, email, password, passwordConfirmation });

  return res.json(user);
});

export default usersRouter;
