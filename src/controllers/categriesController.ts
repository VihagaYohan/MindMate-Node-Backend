import {NextFunction, Request, Response} from 'express'
import {CategorySchema} from '../schemas'
import {ErrorResponse, SuccessResponse} from '../shared/response'
import {AsyncHandler} from '../middleware'

const {Categories, categoryValidationSchema} = CategorySchema


/* 
    @desc   Get all categories
    @route  GET /api/v1/categories
    @access Private
*/
export const getAllCategories = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Categories.find().sort({title: 1});
    if (categories.length === 0) {
        return res.status(200).json(new SuccessResponse(true, 'No categories found', []));
    }

    res.status(200).json(new SuccessResponse(true, 'Categories fetched successfully', categories));
})


/* 
    @desc   Create a new category
    @route  POST /api/v1/categories
    @access Private
*/
export const createCategory = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {error} = categoryValidationSchema(req.body)

    if (error) {
        return next(new ErrorResponse(400, error.details[0].message))
    }

    const {title, backgroundColor, imageUrl} = req.body
    const category = await Categories.create({title, backgroundColor, imageUrl})

    res.status(201).json(new SuccessResponse(true, 'Category created successfully', category));
})
