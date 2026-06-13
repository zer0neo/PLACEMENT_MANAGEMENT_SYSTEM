const express = require('express')

const router = express.Router()

const multer = require('multer')

const storage = multer({storage:multer.memoryStorage()});

const studentDashboardController = require('../controllers/studentDashboard.controller')

router.post('/resume',storage.single("resume_url"),studentDashboardController.studentCredentials)

module.exports = router