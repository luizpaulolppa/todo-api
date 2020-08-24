import "reflect-metadata";
import "express-async-errors";
import express from 'express';
import cors from 'cors';
import routes from './routes';
import errorHandler from "./middleware/errorHandler";
import "./database";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

export default app;
