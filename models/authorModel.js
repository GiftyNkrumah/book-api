const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name of author required']
    },

    rating: {
        type: Number,
        required: [true, 'rating required']
    },

    books: {
        type: Object,
        required: [true, 'at least one book required'],
        properties: {
            title: {type: String}
        }
    },

    authorId: {
        type: Number,
        required: true
    }
})

const Author = mongoose.model('author', authorSchema)

module.exports = Author