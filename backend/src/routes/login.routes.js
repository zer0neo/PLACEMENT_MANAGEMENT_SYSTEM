const express = require('express')

const router = express.Router()

const loginController = require('../controllers/login.controller')

router.post('/students',loginController.studentLogin)
router.post('/placement_officer',loginController.placementOfficerLogin)
router.post('/recruiter',loginController.recruiterLogin)

module.exports = router