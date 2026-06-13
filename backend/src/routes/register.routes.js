const express = require('express')

const router = express.Router()

const authMiddleware = require('../middleware/register.middleware')

const authController = require('../controllers/register.controller')

router.post('/students',authMiddleware.authMiddleware('students'),authController.studentReg)

router.post('/placement_officer',authMiddleware.authMiddleware('placement_officer'),authController.placementOfficerReg)

router.post('/recruiter',authMiddleware.authMiddleware('recruiter'),authController.recruiterReg)

module.exports = router