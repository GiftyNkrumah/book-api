const Book = require('../models/bookModel')

function handleError(error) {

}
// exports.index = function (request, response) {
//     Book.get(function (err, books) {
//         if (err) {
//             response.json({
//                 status: 'error',
//                 message: err
//             })
//         }
//         response.json({
//             status: 'success',
//             message: 'Books retrieved successfully',
//             data: books
//         })
//     })
// }

const bookCtrl = {}

// create a book
bookCtrl.new = async(request, response) => {
    try{
        let newBook = new Book(request.body)
        let result = await newBook.save()
        response.status(200).send({message:'New book created', result})
    } catch {
        const warnings = handleError(error)
        response.status(400).json({warnings})
    }
}

// find a book
bookCtrl.view = async(request, response) => {
    try {
        let book = await Book.findOne({title: request.body.title})
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
bookCtrl.delete = async (request, response) => {
    try{
        await Book.findOneAndDelete({_id: request.params.id})
        response.status(200).send({message: 'Book deleted'})
    } catch (error) {
        const warnings = handleError(error)
        response.status(400).json({warnings})
    }
}

module.exports = bookCtrl
