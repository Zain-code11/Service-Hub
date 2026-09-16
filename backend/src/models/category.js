//*  Category Schema

import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        description: {
            type: String,
            default: '',
            trim: true
        },
        image: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model('categories', categorySchema, 'categories')
export default Category
