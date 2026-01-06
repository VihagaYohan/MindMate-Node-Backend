import { Request, Response, NextFunction } from 'express'
import { ResourceSchema } from '../schemas'
import { ErrorResponse, SuccessResponse } from '../shared/response'
import { AsyncHandler } from '../middleware'
import SeedData from '../shared/db/seed'

const { Resource, resourceSchemaValidation } = ResourceSchema


/* 
    @desc       Create new resource
    @route      POST /api/v1/seed
    @access     Private
*/
export const seedDB = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    SeedData.map(async (item) => {
        await Resource.create(item)
    })

    return res.status(200).json({
        statu: true,
        message: "Database has been seeded"
    })
})