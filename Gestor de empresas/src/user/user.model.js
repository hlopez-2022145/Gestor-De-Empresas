import { Schema, model } from 'mongoose'

const userSchema = Schema({
    names: {
        type: String,
        required: [true, 'The names is required']
    },
    surnames: {
        type: String,
        required: [true, 'The surnames is required']
    },
    phone: {
        type: String,
        unique: true,
        minLength: [8, 'Must be 8 numbers'],
        maxLength: [8, 'Must be 8 numbers'],
        required: [true, 'The phone is required']
    },
    mail: {
        type: String,
        unique: true,
        required: [true, 'The mail is required']
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'The username is required']
    },
    password: {
        type: String,
        minLength: [8, 'Password must be 8 charcaters'],
        required: [true, 'The password is required']
    },
    role: {
        type: String,
        upercase: true,
        default: 'ADMIN',
        required: [true, 'The role is required']
        
    }
})

export default model('user', userSchema)