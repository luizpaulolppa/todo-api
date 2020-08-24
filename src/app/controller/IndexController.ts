import { Router, Request, Response } from 'express';

const indexRouter = Router();

indexRouter.get("/", async (_req: Request, res: Response) => {
  return res.json({ ok: true });
});

export default indexRouter;
