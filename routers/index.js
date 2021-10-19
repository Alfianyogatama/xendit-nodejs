const router = require('express').Router()
const Controller = require('./../controllers')

router.post('/create', Controller.createInvoice)
// router.get('/status', Controller.checkInvoice)
// router.post('/charge', Controller.createCharge)

module.exports = router