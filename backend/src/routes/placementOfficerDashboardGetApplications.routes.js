const express = require('express')

const router = express.Router()

const placementOfficerDashboardGetApplicationsController = require('../controllers/placementOfficerDashboardGetApplications.controller')

router.get('/get_applications',placementOfficerDashboardGetApplicationsController.getApplications)

module.exports = router


// /api/placement_officer_get_applications