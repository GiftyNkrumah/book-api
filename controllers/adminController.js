const Admin = require('../models/adminModel')

function handleError(error) {

    let err = {username: '', email: '', password: ''}

    if (error.message === 'incorrect username') {
        err.username = 'that username does not exist'
    }

    if (error.message === 'incorrect email') {
        err.email = 'that email is not valid'
    }

    if (error.message === 'incorrect password') {
        err.password = 'that password is incorrect'
    }

    if (error.code === 11000) {
        err.message = 'that email is registered already'
    }    

    if (error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({properties}) => {
            err[properties.path] = properties.message
        })
    }

    return err
}

const adminCtrl = {}

// Create a new admin
adminCtrl.new = async(request, response) => {
    try {
        let newAdmin = new Admin(request.body)
        let result = await newAdmin.save()
        response.status(200).send({message: 'Account created', result})
    } catch (error) {
        const warnings = handleError(error)
        response.status(400).json({warnings})
    }
}

// Read a user detail
adminCtrl.view = async(request, response) => {
    try{
        let person = await Admin.findOne({username: request.body.username})
        if (!person) {
            response.status(400).send({message: 'Username not found'})
        } else {
            response.status(200).send({message: 'User logged in'})
        }
    } catch (error) {
        const warnings = handleError(error)
        response.status(400).json({warnings})
    }
}

// Update user details 
adminCtrl.update = async(request, response) => {
    try {
        await Admin.findOneAndUpdate({_id: request.params.id}, async(admin, error) => {
            if (error) {
                response.status(500).send({message: 'Internal Server Error'})
            }
            admin.firstname = request.body.firstname
            admin.middlename = request.body.middlename
            admin.lastname = request.body.lastname
            admin.username = request.body.username
            admin.email = request.body.email
            admin.password = request.body.password
            await admin.save()
            response.status(200).send({message: 'User updated', admin})
        })
    } catch (error) {
        const warnings = handleError(error)
        response.status(400).json({warnings})
    }
}

// Delete a user account
adminCtrl.delete = async(request, response) => {
    try {
        await Admin.findOneAndDelete({_id: request.params.id})
        response.status(200).send({message: 'Account deleted'})
    } catch (error) {
        const warnings = handleError(error)
        response.status(400).json({warnings})
    }
}

module.exports = adminCtrl