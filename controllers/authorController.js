const Author = require('../models/authorModel')

function handleError(error) {

    let err = {name: ''}

    if (error.message === 'incorrect author') {
        err.name = 'that author does not exist in our database'
    }

       if (error.code === 11000) {
        err.message = 'that author is registered already'
    }    

    if (error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({properties}) => {
            err[properties.path] = properties.message
        })
    }

    return err
}

const authorCtrl = {}

// create a new author
authorCtrl.newauthor = async(request, response) => {
    try {
        let newAuthor = new Author(request.body)
        let result = await newAuthor.save()
        response.status(200).send({message: 'Author created', result})
    } catch (error) {
        const warnings = handleError(error)
        response.status(400).json({warnings})
    }
}

// find an author
authorCtrl.view = async(request, response) => {
    try{
        let author = await Author.findOne({_id: request.params.id})
        if (!author) {
            response.status(400).send({message: 'Author not found'})
        } else {
            response.status(200).send({message: '1 author found'})
        }
    } catch (error) {
        const warnings = handleError(error)
        response.status(400).json({warnings})
    }
}

// Delete an author
authorCtrl.deleteauthor = async(req, res) => {
    try {
        await Author.findOneAndDelete({_id: req.params.id})
        res.status(200).send({message: 'Account deleted'})
    } catch (error) {
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

module.exports = authorCtrl