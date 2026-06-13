const express = require('express')

const router = express.Router()
const recruiterController = require('../controllers/recruiterDashboard.controller')

router.post('/cutoff',recruiterController.recruiterCutOff);

module.exports = router