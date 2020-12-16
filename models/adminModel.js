const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [5, 'minimum username length is 5'],
        maxlength: [16, 'maximum username length is 16'], 
        unique: [true, 'username already taken'],
        required: [true, 'username required'],
        lowercase: true
    },

    email: {
        type: String,
        unique: [true, 'email already has an account'],
        required: [true, 'email address required'],
        lowercase: true
    },

    password: {
        type: String,
        minlength: [8, 'minimum password length is 8'],
        required: [true, 'password required']
    }
})

const Admin = mongoose.model('admin', adminSchema)

adminSchema.pre('save', function() {
    if (this.password !== null || undefined) {
        bcrypt.hash(this.password, 'secret-text', function(err, hash) {
            this.password = hash
        })
    }
    next()
})

module.exports = Admin
