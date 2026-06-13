const express = require('express')

const router = express.Router()
const studentSelectedController = require('../controllers/studentSelected.controller')

router.put(
    '/selected/:application_id',
    studentSelectedController.selectStudent
);

module.exports = router;