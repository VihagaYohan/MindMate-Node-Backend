import { Request, Response, NextFunction } from 'express'
import { ResourceSchema } from '../schemas'
import { ErrorResponse, SuccessResponse } from '../shared/response'
import { AsyncHandler } from '../middleware'

const { Resource, resourceSchemaValidation } = ResourceSchema

/* 
    @desc       Get all resources for selected category
    @route      GET /api/v1/resources
    @access     Private
*/
export const getAllResources = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const resources = await Resource.find().sort({ createdAt: -1 })

    res.status(200).json(new SuccessResponse(true, "Resources has been fetched successfully", resources))
})

/* 
    @desc       Get resource by id
    @route      GET /api/v1/resources/id
    @access     Private
*/
export const getResource = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const resources = await Resource.findById(req.params.id)
    return res.status(200).json(new SuccessResponse(true, `Resource has been fetched successfully for the given id ${req.params.id}`, resources),)
})


/* 
    @desc       Get resource category id
    @route      GET /api/v1/resources?categoryId=id
    @access     Private
*/
export const getResourcesByCategoryId = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const resources = await Resource.find({ categoryId: req.query.categoryId })
    return res.status(200).json(new SuccessResponse(true, `Resources have been fetched succesfully for the given category id ${req.query.id}`, resources))
})


/* 
    @desc       Create new resource
    @route      POST /api/v1/resources
    @access     Private
*/
export const addResource = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // check for validation errors
    const { error } = resourceSchemaValidation(req.body)
    if (error) {
        return next(new ErrorResponse(400, error.details[0].message))
    }

    const resource = await Resource.create(req.body)
    return res.status(200).json(new SuccessResponse(true, "New resource has been added", resource))
})

/* 
    @desc       Update resource
    @route      PUT /api/v1/resources/:id
    @access     Private 
*/
export const updateResource = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // check for validation errors
    const { error } = await resourceSchemaValidation(req.body)
    if (error) {
        return next(new ErrorResponse(400, error.details[0].message))
    }

    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body)
    if (!resource) {
        return next(new ErrorResponse(404, "Unable to locate resource"))
    }
    return res.status(200).json(new SuccessResponse(true, "Resource has been updated successfully", resource))
})

/* 
    @desc       Delete resource
    @route      PUT /api/v1/resources/:id
    @access     Private 
*/
export const deleteResource = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const updatedResource = await Resource.findByIdAndUpdate(req.params.id, { 'isActive': false })
    if (!updatedResource) {
        return next(new ErrorResponse(404, 'Unable to locate resource'))
    }

    return res.status(200).json(new SuccessResponse(true, `Resource with id ${req.params.id} has been deleted successfully`, null))
})