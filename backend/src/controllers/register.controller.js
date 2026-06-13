const db = require('../db/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const studentReg = (req, res) => {

    const { name, email } = req.body;
    const hash = req.hash
    const query2 = "insert into students(name,email,password) values(?,?,?)"



    db.query(query2, [name, email, hash], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "database error" })
        }
        const studentId = result.insertId //important for token id. insertId is a built in meta-deta from sql insert functions

        const token = jwt.sign({
            id: studentId,
            role: 'student'
        }, process.env.JWT)

        res.cookie("token", token)
        return res.status(201).json({
            name: name,
            email: email,
            role: 'student'
        })

    })


}

const placementOfficerReg = (req, res) => {

    const { name, email } = req.body;
    const hash = req.hash
    const query2 = "insert into placement_officer(name,email,password) values(?,?,?)"



    db.query(query2, [name, email, hash], (err, result) => {
        console.log(err)
        if (err) {
            return res.status(500).json({ message: "database error" })
        }
        const placementOfficerId = result.insertId //important for token id. insertId is a built in meta-deta from sql insert functions

        const token = jwt.sign({
            id: placementOfficerId,
            role: 'placement_officer'
        }, process.env.JWT)

        res.cookie("token", token)
        return res.status(201).json({
            name: name,
            email: email,
            role: 'placement_officer'
        })

    })

}

const recruiterReg = (req, res) => {
    const { name, email } = req.body;
    const hash = req.hash
    const query2 = "insert into recruiter(name,email,password) values(?,?,?)"



    db.query(query2, [name, email, hash], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "database error" })
        }
        const recruiterId = result.insertId //important for token id. insertId is a built in meta-deta from sql insert functions

        const token = jwt.sign({
            id: recruiterId,
            role: 'recruiter'
        }, process.env.JWT)

        res.cookie("token", token)
        return res.status(201).json({
            name: name,
            email: email,
            role: 'recruiter'
        })

    })
}



module.exports = { studentReg, placementOfficerReg, recruiterReg }