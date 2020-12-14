const { Router } = require('express')
const router = Router()

router.get('/', function (request, response) {
    response.json({
        status: 'working',
        message: 'This is the /api/ route!'
    })
})

module.exports = router