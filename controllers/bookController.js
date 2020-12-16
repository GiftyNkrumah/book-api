const Book = require('../models/bookModel')

function handleError(error) {

    let err = {title: ''}

    if (error.message === 'incorrect book') {
        err.title = 'that book does not exist in our database'
    }

    if (error.code === 11000) {
        err.message = 'that book is registered already'
    }    

    if (error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({properties}) => {
            err[properties.path] = properties.message
        })
    }

    return err
}

const bookCtrl = {}

// create a book
bookCtrl.newbook = async(request, response) => {
    try{
        let newBook = new Book(request.body)
        let result = await newBook.save()
        response.status(200).send({message:'New book created', result})
    } catch {
        const warnings = handleError(error)
        response.status(400).json({warnings})
    }
}

// find all books...work-in-progress
bookCtrl.viewall = async(request, response) => {
    try {
        let book = await Book.find({_id: request.params.id})
        if (!book) {
            response.status(400).send({message: 'No books found'})
        } else {
            response.status(200).send({message: 'Books found'})
        }
    } catch (error) {
        const warnings = handleError(error)
        response.status(400).json({warnings})  
    }
}

// find a book
bookCtrl.viewbook = async(request, response) => {
    try {
        let book = await Book.findOne({_id: request.params.id})
        if (!book) {
            response.status(400).send({message: 'Book not found'})
        } else {
            response.status(200).send({message: '1 book found'})
        }
    } catch (error) {
        const warnings = handleError(error)
        response.status(400).json({warnings})  
    }
}

//  delete a book
bookCtrl.deletebook = async (request, response) => {
    try{
        await Book.findOneAndDelete({_id: request.params.id})
        response.status(200).send({message: 'Book deleted'})
    } catch (error) {
        const warnings = handleError(error)
        response.status(400).json({warnings})
    }
}

module.exports = bookCtrl
