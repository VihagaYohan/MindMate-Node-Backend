import mongoose from 'mongoose';
import Joi from 'joi'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['user', 'consultant', 'admin'],
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const userSchemaValidation = (user: any) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            "string.base": "Email should be a type of text",
            "string.empty": "Email cannot be an empty field",
            "string.email": "Email must be a valid email",
            "any.required": "Email is a required field"
        }),
        password: Joi.string().min(6).required().messages({
            "string.base": "Password should be a type of text",
            "string.empty": "Password cannot be an empty field",
            "string.min": "Password should have a minimum length of 6",
            "any.required": "Password is a required field"
        }),
        userType: Joi.string().valid('user', 'consultant', 'admin').messages({
            "string.base": "User type should be a type of text",
            "string.empty": "User type cannot be an empty field",
            "any.only": "User type must be one of [user, consultant, admin]"
        })
    })
    return schema.validate(user)
}

const Users = mongoose.model("User", userSchema);

export default {
    Users,
    userSchema,
    userSchemaValidation
}