const { Router } = require('express')
const router = Router()

// router.get('/', function (request, response) {
//     response.json({
//         status: 'working',
//         message: 'This is the /api/ route!'
//     })
// })

const {
    newbook,
    viewall,
    viewbook,
    deletebook
} = require('../controllers/bookController')

const {
    newauthor,
    // viewall,
    viewauthor,
    deleteauthor
} = require('../controllers/authorController')

// route for creating a new book
router.post('/api/books', newauthor)

// // route for getting list of all books
// router.get('/api/books', viewall)

// route for getting a specific book
router.get('/api/books/:bookid', viewbook)

// route for deleting a book
router.delete('/api/books/:bookid', deletebook)

// route for creating a new author
router.post('/api/authors', newauthor)

// route for getting list of all authors
router.get('/api/authors', viewall)

// route for getting a specific book
router.get('/api/authors/:authorid', viewauthor)

// route for deleting an account
router.delete('/api/authors/:authorid', deleteauthor)

module.exports = router