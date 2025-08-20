import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { IApiResponse } from "../interfaces/response.interface";
import { StatusCodes } from "http-status-codes";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error("Unhandled error:", error);

  const response: IApiResponse<null> = {
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : error.message,
  };

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
};
