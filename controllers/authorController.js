const Author = require('../models/authorModel')

function handleError(error) {

}

const authorCtrl = {}

// create a new author
authorCtrl.new = async(request, response) => {
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
        let author = await Author.findOne({name: request.body.username})
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
authorCtrl.delete = async(req, res) => {
    try {
        let person = await Author.findOneAndDelete({_id: req.params.id})
        res.status(200).send({message: 'Account deleted'})
    } catch (error) {
        const warnings = handleError(error)
        res.status(400).json({warnings})
    }
}

module.exports = authorCtrl