import { Request, Response, NextFunction } from 'express'
import { UserSchema } from '../schemas'
import { ErrorResponse, SuccessResponse } from '../shared/response'
import { AsyncHandler } from '../middleware'

const { Users, userSchemaValidation } = UserSchema

/* 
    @desc   Create a user
    @route  POST /api/v1/users
    @access Public
*/
export const createUser = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // check if the email already exists
    const emailExists = await Users.findOne({ email: req.body.email })
    if (emailExists) {
        return next(new ErrorResponse(400, "Email already exists"))
    }

    // check for validation
    const { error } = userSchemaValidation(req.body);
    if (error) {
        const message = error.details && error.details[0] ? error.details[0].message : "Validation error";
        return next(new ErrorResponse(400, message))
    }

    const user = await Users.create(req.body)

    res.status(200).json(new SuccessResponse(true, "User created successfully", user))
})