const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const todoSchema = new Schema({
    details: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model("Todo", todoSchema )