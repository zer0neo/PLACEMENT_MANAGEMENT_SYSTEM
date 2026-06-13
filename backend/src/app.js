const express = require('express')
const app = express()
const cookies = require('cookie-parser')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookies())



const regRouter = require('./routes/register.routes')
const loginRouter = require('./routes/login.routes')
const studentDashboardRouter = require('./routes/studentDashboard.routes')
const recruiterDashboardRouter = require('./routes/recruiterDashboard.routes')
const placementOfficerDashboardGetJobsRouter = require('./routes/placementOfficerDashboardGetJobs.routes')
const placementOfficerDashboardGetApplicationsRouter = require('./routes/placementOfficerDashboardGetApplications.routes')
const selectedStudentRouter = require('./routes/studentSelected.routes')
const viewStudentStatusRouter = require('./routes/studentDashboardViewStatus.routes')
const viewSelectedStudents = require('./routes/recruiterDashboardSelectedStudents.routes')

app.use('/api/register',regRouter)
app.use('/api/login',loginRouter)
app.use('/api/students',studentDashboardRouter)
app.use('/api/recruiter',recruiterDashboardRouter)
app.use('/api/placement_officer',placementOfficerDashboardGetJobsRouter)
app.use('/api/placement_officer',placementOfficerDashboardGetApplicationsRouter)
app.use('/api/placement_officer',selectedStudentRouter)
app.use('/api/students',viewStudentStatusRouter)
app.use('/api/recruiter',viewSelectedStudents)

module.exports = app