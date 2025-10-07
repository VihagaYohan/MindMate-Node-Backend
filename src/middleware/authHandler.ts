import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ErrorResponse } from '../shared/response'
import asyncHandler from './asyncHandler'
import { UserSchema } from '../schemas'
import { TokenPayload } from '../models'

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const { Users } = UserSchema

const Protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return next(new ErrorResponse(401, 'Not authorize to access this route'))
    }

    try {
        // verify token
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as TokenPayload;
        req.user = await Users.findById(decoded.id);
        next();
    } catch (e) {
        return next(new ErrorResponse(400, "Not authorize to access this route"))
    }
})

export default Protect