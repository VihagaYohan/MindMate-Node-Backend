import { NextFunction, Request, Response } from 'express'
import { CategorySchema } from '../schemas'
import { ErrorResponse, SuccessResponse } from '../shared/response'
import { AsyncHandler } from '../middleware'

const { Categories, categoryValidationSchema } = CategorySchema


/* 
    @desc   Get all categories
    @route  GET /api/v1/categories
    @access Private
*/
export const getAllCategories = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // extract query params
    const page: number = parseInt(req.query.page as string, 10) || 1
    const limit: number = parseInt(req.query.limit as string, 10) || 10

    // query filter
    const filter = {
        isActive: true
    }

    // count total results for pagination
    const total = await Categories.countDocuments(filter)

    // fetch paginated results
    const categories = await Categories.find(filter).sort({ title: 1 }).skip((page - 1) * limit).limit(limit)

    if (categories.length === 0) {
        return res.status(200).json(new SuccessResponse(true, 'No categories found', []));
    }

    const respondObj = {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        data: categories
    }

    res.status(200).json(new SuccessResponse(true, 'Categories fetched successfully', respondObj));
})


/* 
    @desc   Create a new category
    @route  POST /api/v1/categories
    @access Private
*/
export const createCategory = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { error } = categoryValidationSchema(req.body)

    if (error) {
        return next(new ErrorResponse(400, error.details[0].message))
    }

    const { title, backgroundColor, imageUrl } = req.body
    const category = await Categories.create({ title, backgroundColor, imageUrl })

    res.status(201).json(new SuccessResponse(true, 'Category created successfully', category));
})
