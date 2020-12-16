require('dotenv').config()
const express = require ('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const dbLink = process.env.DBLINK
const port = process.env.DBPORT
const routes = require('./routes/routes')

mongoose.connect(dbLink, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}, () => {
    app.listen(port, () => {
        console.log('Server has started on port ' + port) 
    })
}, (error) => {
    console.log(dbLink, port)
})

app.get('/', function(request, response) {
    response.send('Good start!')
})

app.use('/api', routes)
