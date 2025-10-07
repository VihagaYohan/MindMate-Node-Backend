import mongoose from 'mongoose'
import { Types } from 'mongoose'
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const profileSchema = new mongoose.Schema({
    userId: Types.ObjectId,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    }
}, { timestamps: true })

const profileSchemaValidation = (profile: any) => {
    const schema = Joi.object({
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
        gender: Joi.string().valid('male', 'female').required().messages({
            "string.base": "Gender type should be a type of a text",
            "string.empty": "Gender type cannot be an empty field",
            "string.required": "Gender is a required field",
            "any.only": "Gender type must be one of [male, female]"
        }),
        birthDate: Joi.date().iso().required("Birthdate is a required field").messages({
            "date.base": "Birthdate should be a valid date",
            "any.required": "Birthdate is a required field"
        })
    })
    return schema.validate(profile)
}

const Profile = mongoose.model('profile', profileSchema)

export default {
    Profile,
    profileSchema,
    profileSchemaValidation
}
