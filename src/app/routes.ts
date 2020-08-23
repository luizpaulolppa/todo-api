import { Router } from 'express';
import userController from "./controller/UserController";

const routes = Router();

routes.use("/users", userController);

export default routes;
