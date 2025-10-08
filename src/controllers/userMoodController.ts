import { Request, Response, NextFunction } from 'express'
import { AsyncHandler } from '../middleware'
import { UserMoodSchema } from '../schemas'
import { ErrorResponse, SuccessResponse } from '../shared/response'
import { Types } from 'mongoose'

const { UserMood, userMoodSchemaValidation } = UserMoodSchema

/* 
    @desc       Get all user moods
    @routes     GET /api/v1/user-mood/:id
    @access     Private
*/
export const getAllUserMoods = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id
    // check for unauthorized user id
    if (!userId) {
        return next(new ErrorResponse(400, "Unauthorized access deined. user id not found"))
    }

    // extract query params
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limi as string, 10) || 10

    // handle optional date query
    const dateParam = req.query.date ? new Date(Number(req.query.date)) : new Date();

    // create date range (start and end of the given day)
    const startOfDay = new Date(dateParam);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(dateParam);
    endOfDay.setHours(23, 59, 59, 999);

    // query filter
    const filter = {
        userId: new Types.ObjectId(userId),
        createdAt: { $gte: startOfDay, $lte: endOfDay },
        isActive: true
    }

    // count total results for pagination
    const total = await UserMood.countDocuments(filter)

    // fetch paginated results
    const moods = await UserMood.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit)

    const respondObj = {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        data: moods
    }

    res.status(200).json(new SuccessResponse(true, "User mood fetch successfully", respondObj))

})

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