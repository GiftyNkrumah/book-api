const express = require ('express')
const app = express()

const port = process.env.DBPORT ||1200
const routes = require('./routes/routes')

app.get('/', function(request, response) {
    response.send('Good start!')
})

app.listen(port, function(){
    console.log('Server has started on port ' + port) 
})

app.use('/api', routes)
