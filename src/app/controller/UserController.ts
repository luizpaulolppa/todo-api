import { Router, Request, Response, NextFunction } from 'express';
import UserService from '../service/UserService';

const usersRouter = Router();
const userService = new UserService();

usersRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, passwordConfirmation } = req.body;

    const user = await userService.createUser({ name, email, password, passwordConfirmation });

    return res.json(user);
  } catch(ex) {
    return next(ex);
  }
});

export default usersRouter;
