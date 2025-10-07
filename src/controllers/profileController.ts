import { Request, Response, NextFunction } from 'express'
import { AsyncHandler } from '../middleware'

// shared
import { ErrorResponse, SuccessResponse } from '../shared/response'

// schema
import { ProfileSchema } from '../schemas'
const { Profile, profileSchemaValidation } = ProfileSchema


/* 
    @desc       Get profile by user id
    @routes     GET /api/v1/profiles?userId
    @access     Public
*/
export const getProfileByUserId = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.query
    if (!userId) {
        return next(new ErrorResponse(400, 'User id was not provided'))
    }

    // find profile by user id
    const profile = await Profile.findOne({ 'userId': userId })
    if (!profile) {
        return next(new ErrorResponse(404, 'Profile was not found the provided user id'))
    }

    return res.status(200).json(new SuccessResponse(true, 'Profile located successfully', profile))
})

/* 
    @desc       Create a new profile
    @route      POST /api/v1/profiles
    @access     Public
*/
export const createProfile = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // check for validation
    const { error } = profileSchemaValidation(req.body)
    if (error) {
        return next(new ErrorResponse(400, error.details[0].message))
    }

    // check if the exiting record available for the same userId
    const isExisting = await Profile.findOne({ 'userId': req.body.userId })
    if (isExisting) {
        return next(new ErrorResponse(409, "Profile already exists with current user id"))
    }

    // create profile
    const profile = await Profile.create(req.body)

    return res.status(200).json(new SuccessResponse(true, 'Profile has been created successfully', profile))
})

/* 
    @desc       Update profile
    @route      PUT /api/v1/profiles/id
    @access     Private
*/
export const updateProfile = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // check for validation errors
    const { error } = profileSchemaValidation(req.body)
    if (error) {
        return next(new ErrorResponse(400, error.details[0].message))
    }

    // check whether profile exists with the given user Id
    let profile = await Profile.findByIdAndUpdate(req.params.id, req.body)
    if (!profile) {
        return next(new ErrorResponse(404, "Unable to locate profile"))
    }

    return res.status(200).json(new SuccessResponse(true, "Profile was updated successfully", profile))
})


/* 
    @desc       Delete profile
    @route      DELETE /api/v1/profiles/id
    @access     Private
*/
export const deleteProfile = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // check if the profile available with given profile id, if -> set isActive to false
    const profile = await Profile.findByIdAndUpdate(req.params.id, { isActive: false })
    if (!profile) {
        return next(new ErrorResponse(404, 'Unable to locate profile'))
    }

    return res.status(200).json(new SuccessResponse(true, 'Profile has been set to delete', profile))
})
