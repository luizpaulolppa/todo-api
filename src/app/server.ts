import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import "./database";
import AppError from "./error/AppError";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  }

  return response.status(500).json({
    status: 500,
    message: "Internal server error"
  })
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000!!!!");
});
