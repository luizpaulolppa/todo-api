import { Router } from 'express';
import userController from "./controller/UserController";
import authController from "./controller/AuthController";

const routes = Router();

routes.use("/users", userController);
routes.use("/auth", authController);

export default routes;
