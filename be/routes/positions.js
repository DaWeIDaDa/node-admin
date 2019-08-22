var express = require('express')
var router  = express.Router()

const positionController = require('../controller/positions')
const userController = require('../controller/users')

router.get('/list',userController.isSignin,positionController.list)

module.exports = router