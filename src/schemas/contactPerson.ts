import mongoose, { Types } from 'mongoose'
const Joi = require('Joi')
Joi.objectId = require('joi-objectid')(Joi)
import JoiPhoneNumber from 'joi-phone-number'

const ExtendedJoi = Joi.extend(JoiPhoneNumber)

const contactPersonSchema = new mongoose.Schema({
    userId: Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true
    }
}, { timestamps: true })


const contactPersonSchemaValidation = (contactPerson: any) => {
    const schema = ExtendedJoi.object({
        userId: Joi.objectId(),
        firstName: Joi.string().required().messages({
            "string.base": "First name should be a type of text",
            "string.empty": "First name cannot be an empty field",
            "string.required": "First name is a required field"
        }),
        lastName: Joi.string().required().messages({
            "string.base": "Last name should be a type of text",
            "string.empty": "Last name cannot be an empty field",
            "string.required": "Last name is a required field"
        }),
        contactNumber: ExtendedJoi.string().phoneNumber({ defaultCountry: 'UK', format: 'international' }) // e.g. Sri Lanka default
            .required()
            .messages({
                "string.phoneNumber": "Contact number must be a valid phone number",
                "any.required": "Contact number is required"
            })
    })
    return schema.validate(contactPerson)
}

const ContactPerson = mongoose.model('contactPerson', contactPersonSchema)

export default {
    ContactPerson,
    contactPersonSchema,
    contactPersonSchemaValidation
}