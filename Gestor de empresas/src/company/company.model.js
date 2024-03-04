import { Schema, model } from 'mongoose'

const companySchema = Schema({
    companyName: {
        type: String,
        required: [true, 'The company name is required']
    },
    impactLevel: {
        type: String,
        required: [true, 'The impact of level is required']
    },
    yearsOfTrayectory: {
        type: String,
        required: [true, 'The years of trayectory is required']
    },
    category: {
        type: Schema.ObjectId,
        ref: 'category',
        required: [true, 'The id category is required']
    }
})

export default model('company', companySchema )