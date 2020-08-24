import { Router } from 'express';
import userController from "./controller/UserController";
import authController from "./controller/AuthController";
import toDoController from "./controller/ToDoController";
import indexController from "./controller/IndexController";

const routes = Router();

routes.use("/", indexController);
routes.use("/auth", authController);
routes.use("/users", userController);
routes.use("/todos", toDoController);

export default routes;
