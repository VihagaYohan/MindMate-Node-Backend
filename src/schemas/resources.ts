import mongoose, { Types } from 'mongoose'
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const resourcesSchema = new mongoose.Schema({
    categoryId: Types.ObjectId,
    resourceType: {
        type: String,
        enum: ['video', 'article', 'document'],
        required: true
    },
    resourceUrl: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    },
    description: {
        type: String,
    },
    isExternal: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const resourceSchemaValidation = (resource: any) => {
    const schema = Joi.object({
        categoryId: Joi.objectId(),
        resourceType: Joi.string().required().messages({
            "string.base": "Resource type should be a type of text",
            "string.empty": "Resource name cannot be an empty field",
            "string.required": "Resource name is a required field",
            "any.only": "Resource should be one of [video, article, document]"
        }),
        resourceUrl: Joi.string().pattern(new RegExp("\b((https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?)\b")).required().messages({
            'string.base': 'URL must be a string.',
            'string.empty': 'URL cannot be empty.',
            'string.uri': 'Please provide a valid web URL (must start with http or https).',
            'string.required': 'Resource URL is required.',
        }),
        thumbnail: Joi.string().uri({ scheme: ['http', 'https'] })
            .optional()
            .messages({
                'string.uri': 'Thumbnail must be a valid URL.'
            }),
        description: Joi.string()
            .min(50)
            .optional()
            .allow('')
            .messages({
                'string.min': 'Description cannot should be atleast 50 characters long.'
            }),

        isExternal: Joi.boolean()
            .default(true)
            .messages({
                'boolean.base': 'isExternal must be true or false.'
            }),
    })
    return schema.validate(resource)
}

const Resource = mongoose.model('resources', resourcesSchema)

export default {
    Resource,
    resourcesSchema,
    resourceSchemaValidation
}