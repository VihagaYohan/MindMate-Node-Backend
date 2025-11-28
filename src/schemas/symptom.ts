import mongoose, { Types } from 'mongoose'
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const symptomSchema = new mongoose.Schema({
    categoryId: Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    desctiption: {
        type: String,
        required: true
    }
}, { timestamps: true })

