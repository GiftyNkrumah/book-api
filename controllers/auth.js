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
    book.number_of_pages = request.body.number_of_pages
    book.category = request.body.category
    book.rating = request.body.rating

    book.save(function (err) {
        if (err)
            response.json(err)
        response.json({
            message: 'New book created',
            data: book
        })
    })
}

// find a book
exports.view = function(request, response) {
    Book.findById(request.params.book_id, function (err, book) {
        if (err)
            response.send(err)
        response.json({
            message: '1 book found',
            data: book
        })
    })
}

//  delete a book
exports.delete = function (request, response) {
    Book.deleteOne({
        _id: request.params.book_id
    }, function (err, book){
        if (err)
            response.send(err)
        response.json({
            status: 'success',
            message: 'Book deleted'
        })
    })
}
