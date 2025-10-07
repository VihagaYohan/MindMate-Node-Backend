import { Request, Response, NextFunction } from 'express'
import { AsyncHandler } from '../middleware'
import { UserMoodSchema } from '../schemas'
import { ErrorResponse, SuccessResponse } from '../shared/response'

const { UserMood, userMoodSchemaValidation } = UserMoodSchema

/* 
    @desc       Add user mood entry
    @routes     POST /api/v1/user-mood
    @access     Private
*/
export const addUserMood = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // check for validation errors
    const { error } = userMoodSchemaValidation(req.body)
    if (error) {
        return next(new ErrorResponse(400, error.details[0].message))
    }

    const userMood = await UserMood.create(req.body)
    return res.status(200).json(new SuccessResponse(true, 'User mood entry has been added successfully', userMood))
})