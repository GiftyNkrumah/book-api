const express = require ('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const dbLink = "//database"
const port = process.env.DBPORT ||1200
const routes = require('./routes/routes')

mongoose.connect(dbLink, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
var db = mongoose.connection

app.get('/', function(request, response) {
    response.send('Good start!')
})

app.listen(port, function(){
    console.log('Server has started on port ' + port) 
})

app.use('/api', routes)
