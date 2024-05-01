import { HttpException } from "@/exception/HttpException";
import { NextFunction, Response, Request } from "express";

export const ErrorHandler = async (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong!";

    res.status(status).json(message);
  } catch (error) {
    next(error);
  }
};
