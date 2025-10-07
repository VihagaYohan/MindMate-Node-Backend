import { Request, Response, NextFunction } from 'express'
import { ErrorResponse, SuccessResponse } from '../shared/response'
import { ContactPersonSchema } from '../schemas'
import { AsyncHandler } from '../middleware'

const { ContactPerson, contactPersonSchemaValidation } = ContactPersonSchema

/* 
    @desc       Add new contact person
    @route      POST /api/v1/contact-persons
    @access     Private
*/
export const addContactPerson = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // check whether a record already exists for the given user id
    const isExists = await ContactPerson.findOne({ "userId": req.body.userId })
    if (isExists) {
        return next(new ErrorResponse(400, 'Contact person already exists for the given user id'))
    }

    // check for validation errors
    const { error } = contactPersonSchemaValidation(req.body)
    if (error) {
        return next(new ErrorResponse(400, error.details[0].message))
    }

    // add new contact person
    const contactPerson = await ContactPerson.create(req.body)
    return res.status(200).json(new SuccessResponse(true, 'Contact person has been added successfully', contactPerson))
})