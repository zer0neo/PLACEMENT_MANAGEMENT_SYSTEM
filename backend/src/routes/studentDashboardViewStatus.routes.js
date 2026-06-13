const express = require('express');
const router = express.Router();

const getStudentApplicationsContoller = require('../controllers/studentDashboardViewStatus.controller')

router.get(
    '/applications',
    getStudentApplicationsContoller.getStudentApplications
);

module.exports = router;