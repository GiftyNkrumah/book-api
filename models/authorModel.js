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
        required: [title, 'at least one book title required'],
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