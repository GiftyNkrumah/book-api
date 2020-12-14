const Book = require('../models/bookModel')

exports.index = function (request, response) {
    Book.get(function (err, books) {
        if (err) {
            response.json({
                status: 'error',
                message: err
            })
        }
        response.json({
            status: 'success',
            message: 'Books retrieved successfully',
            data: books
        })
    })
}

// create a book
exports.new = function (request, response) {
    let book = new Book()
    book.title = request.body.title? request.body.title: book.title
    book.author = request.body.author
    book.genre = request.body.genre

    book.save(function (err) {
        if (err)
            response.json(err)
        response.json({
            message: 'New book created',
            data: book
        })
    })
}