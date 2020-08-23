import { Router, Request, Response, NextFunction } from 'express';
import AuthService from '../service/AuthService';

const authRouter = Router();
const authService = new AuthService();

authRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.authUser({ email, password });

    return res.json({ user, token });
  } catch(ex) {
    return next(ex);
  }
});

export default authRouter;
