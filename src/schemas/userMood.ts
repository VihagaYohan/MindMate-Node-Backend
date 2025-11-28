import mongoose, { Types } from 'mongoose'
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)


const userMoodSchema = new mongoose.Schema({
    userId: Types.ObjectId,
    level: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        enum: ['sad', 'netural', 'happy'],
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    prediction: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const userMoodSchemaValidation = (mood: any) => {
    const schema = Joi.object({
        userId: Joi.objectId(),
        level: Joi.number().required().messages({
            "number.base": "Mood level should be a type of number",
            "number.required": "Mood level is a required field",
            "number.any": "Mood level cannot be an empty field"
        }),
        description: Joi.string().required().messages({
            "string.base": "Description name should be a type of text",
            "string.empty": "Description name cannot be an empty field",
            "any.only": "Mood description should be one of [Sad, Neutral, Happy]",
            "string.required": "Description name is a required field"
        }),
        notes: Joi.string().required().messages({
            "string.base": "Notes name should be a type of text",
            "string.empty": "Notes name cannot be an empty field",
            "string.required": "Notes name is a required field"
        })
    })
    return schema.validate(mood)
}

const UserMood = mongoose.model('userMoods', userMoodSchema)

export default {
    UserMood,
    userMoodSchemaValidation,
    userMoodSchema
}

