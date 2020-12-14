const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title required']
    },

    author: {
        type: String,
        required: [true, 'author required']
    },

    number_of_pages: {
        type: Number,
        required: [true, 'number of pages required']
    },

    category: {
        type: String,
        required: [true, 'please indicate category']
    },

    rating: {
        type: Number,
        required: [true, 'rating required']
    }
})

const Book = mongoose.model('book', bookSchema)

module.exports = Book