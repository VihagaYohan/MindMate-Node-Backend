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

    const userMood = await UserMood.create({ ...req.body, userId: req.user.id })
    return res.status(200).json(new SuccessResponse(true, 'User mood entry has been added successfully', userMood))
})

/* 
    @desc       Update user mood entry
    @routes     PUT /api/v1/user-mood/:id
    @access     Private
*/
export const updateUserMood = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // check whether existing records exists
    const isExists = await UserMood.findOne({ 'userId': req.params.id })
    if (isExists) {
        return next(new ErrorResponse(404, 'Unable to locat record'))
    }

    // check for validation errors
    const { error } = userMoodSchemaValidation(req.body)
    if (error) {
        return next(new ErrorResponse(400, error.details[0].message))
    }

    const updatedMood = await UserMood.findByIdAndUpdate(req.params.id, req.body)
    return res.status(200).json(new SuccessResponse(true, 'User mood has been updated successfully', updateUserMood))
})

/* 
    @desc       Delete user mood
    @routes     PUT /api/v1/user-mood/:id
    @access     Private
*/
export const deleteUserMood = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // check whether existing records exists
    const isExists = await UserMood.findOne({ 'userId': req.params.id })
    if (isExists) {
        return next(new ErrorResponse(404, 'Unable to locat record'))
    }

    const updatedMood = await UserMood.findByIdAndUpdate(req.params.id, { "isActive": false })
    return res.status(200).json(new SuccessResponse(true, `User mood with id ${req.params.id} has been deleted successfully`, null))
})