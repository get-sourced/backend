import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../../utils/statusCodes";
import ErrorClass from "../../utils/error/error_class";
import { Error } from "mongoose";


const sendError = (err: ErrorClass, res: Response) => {
  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json({ error: err.message, status: err.status });
  }
  return res
    .status(StatusCodes.SERVER_ERROR)
    .json({ status: "error", error: "Something went wrong." });
};

export default (
  err: Error | ErrorClass,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  sendError(error as ErrorClass, res);
};
