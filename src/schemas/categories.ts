import mongoose from 'mongoose';
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    backgroundColor: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


const categoryValidationSchema = (category: any) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required().messages({
            "string.base": "Title should be a type of text",
            "string.empty": "Titlte cannot be an empty field",
            "string.min": "Title should have a minimum length of 3",
            "string.max": "Title should have a maximum length of 30",
            "any.required": "Title is a required field"
        }),
        backgroundColor: Joi.string().required().messages({
            "string.base": "Background color should be a type of text",
            "string.empty": "Background color cannot be an empty field",
            "any.required": "Background color is a required field"
        }),
        imageUrl: Joi.string().uri().required().messages({
            "string.base": "Image URL should be a type of text",
            "string.empty": "Image URL cannot be an empty field",
            "string.uri": "Image URL must be a valid URI",
            "any.required": "Image URL is a required field"
        }),
    })

    return schema.validate(category);
}

const Categories = mongoose.model('Category', categorySchema)

export default {
    Categories,
    categorySchema,
    categoryValidationSchema
}