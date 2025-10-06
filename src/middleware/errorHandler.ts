import morgan from 'morgan'
import { ErrorResponse } from "../shared/response";
import { NextFunction, Request, Response } from 'express';

const errorHandler = (error: ErrorResponse, req: Request, res: Response, next: NextFunction): void => {
    if (process.env.NODE_ENV === "development") {
        // log error
        morgan('dev')
    }
    res.status(error.statusCode || 500).json(new ErrorResponse(error.statusCode || 500, error.message || "Internal server error"))
    next();
}

export default errorHandler;