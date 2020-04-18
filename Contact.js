const mongoose = require('mongoose')

let Schema = mongoose.Schema
let contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    email: String
})

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact