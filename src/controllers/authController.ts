import { Request, Response, NextFunction } from 'express'
import { UserSchema } from '../schemas'
import { ErrorResponse, SuccessResponse } from '../shared/response'
import { AsyncHandler } from '../middleware'

const { Users, userSchemaValidation } = UserSchema

/* 
    @desc   Create a user
    @route  POST /api/v1/auth
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

    // create tokens (access and refresh tokens)
    var tokens = await user.getSignedTokens();

    // add refresh token to cookie
    res.cookie('refreshToken', tokens.refreshToken, {
        //httpOnly: false, 
        //secure: false,
        //sameSite: 'strict'
    })


    res.status(200).json(new SuccessResponse(true, "User created successfully", {
        user,
        token: tokens.accessToken
    }))
})

/* 
    @desc   Login a user
    @route  POST /api/v1/auth/login
    @access Public
*/
export const loginUser = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    // check if email and password are provided
    if (!email || !password) {
        return next(new ErrorResponse(400, "Please provide email and password"))
    }

    // check if the user exists
    const user = await Users.findOne({ email: email })
    if (!user) {
        return next(new ErrorResponse(400, "Invalid credentials"))
    }

    // check if password matches
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
        return next(new ErrorResponse(400, "Invalid credentials"))
    }

    // create tokens (access and refresh tokens)
    var tokens = await user.getSignedTokens();

    // add refresh token to cookie
    res.cookie('refreshToken', tokens.refreshToken, {
        //httpOnly: false, 
        //secure: false,
        //sameSite: 'strict'
    })

    res.status(200).json(new SuccessResponse(true, "User logged in successfully", {
        user,
        token: tokens.accessToken
    }))
})