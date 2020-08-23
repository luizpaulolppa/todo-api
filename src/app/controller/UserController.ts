import { Router, Request, Response } from 'express';

const usersRouter = Router();

usersRouter.get("/", (req: Request, res: Response) => {
  return res.json([]);
});

usersRouter.post("/", async (req: Request, res: Response) => {
  const { name, email, password, passwordConfirmation } = req.body;
  return res.json({ name, email, password, passwordConfirmation });
});

export default usersRouter;
