const db = require('../db/db')
const jwt = require('jsonwebtoken')
const { imageUpload } = require('../services/imagekit.service')


const studentCredentials = async (req, res) => {
    const { branch, cgpa } = req.body
    const resume = req.file
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT)

    if (!token) {
        return res.status(401).json({ message: "user unauthorized" })
    }

    if (!resume && decoded.role == 'student') {
        return res.status(200).json({ message: "pls add your resume" })
    } else if (decoded.role !== 'student') {
        return res.status(403).json({ message: "you are unauthorized for this role" })
    }

    const fileData = await imageUpload(resume.buffer)

    // if(decoded.role == 'recruiter' || decoded.role == 'placement_officer') {
    //     return res.status(403).json({message:"user forbidden"})
    // }

    query1 = `update students set branch=?,cgpa=?,resume_url=? where student_id=${decoded.id}`

    try {
        db.query(query1, [branch, cgpa, fileData.url], (err, result) => {

            return res.status(200).json({ message: "test ok" })
        })
    } catch (error) {
        return res.status(200).json(error)
    }

}

module.exports = { studentCredentials }