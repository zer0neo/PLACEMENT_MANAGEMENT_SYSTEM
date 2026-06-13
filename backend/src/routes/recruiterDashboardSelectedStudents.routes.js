const express = require('express');
const router = express.Router();

const getSelectedStudentsController = require('../controllers/recruiterDashboardSelectedStudents.controller')

router.get('/selected',getSelectedStudentsController.selected_candidates)

module.exports = router;