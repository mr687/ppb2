const express = require('express')
const router = express.Router()
const reqController = require('../controllers/Req')
const laundryController = require('../controllers/Laundry')
const dumpController = require('../controllers/Dump')

// APP REQ
router.post('/app/req', reqController.createReq)

// LAUNDRY
router.get('/:user/laundries', laundryController.middleware, laundryController.getLaundries)
router.post('/:user/laundries', laundryController.middleware, laundryController.createLaundry)
router.get('/:user/laundries/:laundryId', laundryController.middleware, laundryController.getLaundry)
router.put('/:user/laundries/:laundryId', laundryController.middleware, laundryController.updateLaundry)
router.delete('/:user/laundries/:laundryId', laundryController.middleware, laundryController.deleteLaundry)
router.get('/:user/mysql-dump', laundryController.middleware, dumpController.getFileDump)

module.exports = router