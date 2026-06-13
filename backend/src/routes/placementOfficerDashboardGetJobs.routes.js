const express = require('express')

const router = express.Router()
const placementOfficerDashboardGetJobsController = require('../controllers/placementOfficerDashboardGetJobs.controller')

router.get('/get_jobs',placementOfficerDashboardGetJobsController.getJobs)

module.exports = router
