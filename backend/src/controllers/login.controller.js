const db = require('../db/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const studentLogin = (req, res) => {
    const { email, password } = req.body
    query1 = "select * from students where email=?"

    db.query(query1, [email],async (err, result) => {
        if (err) {
          return  res.status(500).json({
                message: 'database error'
            })
        }

        const [userRow] = result
        
        if (userRow == undefined) {
          return  res.status(200).json('pls register your account, then log-in')
        }else{
            const data = userRow.password
            const isValid =await bcrypt.compare(password, data)

        if (!isValid) {
          return res.status(200).json({ message: "invalid password" })
        }

        const token = jwt.sign({
            id: userRow.student_id,
            role: 'student'
        }, process.env.JWT)

        res.cookie('token', token)

        return res.status(200).json({
            message: "User logged-in successfully",
            name: userRow.name,
            email: userRow.email,
            role: 'student'
        })
        }

    })


}

const placementOfficerLogin = (req, res) => {
 const { email, password } = req.body
    query1 = "select * from placement_officer where email=?"

    db.query(query1, [email],async (err, result) => {
        if (err) {
            console.log(err)
          return  res.status(500).json({
                message: 'database error'
            })
        }

        const [userRow] = result
        
        if (userRow == undefined) {
          return  res.status(200).json('pls register your account, then log-in')
        }else{
            const data = userRow.password
            const isValid =await bcrypt.compare(password, data)

        if (!isValid) {
          return res.status(200).json({ message: "invalid password" })
        }

        const token = jwt.sign({
            id: userRow.officer_id,
            role: 'placement_officer'
        }, process.env.JWT)

        res.cookie('token', token)

        return res.status(200).json({
            message: "User logged-in successfully",
            name: userRow.name,
            email: userRow.email,
            role: 'placement_officer'
        })
        }

    })


}

const recruiterLogin = (req, res) => {
const { email, password } = req.body
    query1 = "select * from recruiter where email=?"

    db.query(query1, [email],async (err, result) => {
        if (err) {
          return  res.status(500).json({
                message: 'database error'
            })
        }

        const [userRow] = result
        
        if (userRow == undefined) {
          return  res.status(200).json('pls register your account, then log-in')
        }else{
            const data = userRow.password
            const isValid =await bcrypt.compare(password, data)

        if (!isValid) {
          return res.status(200).json({ message: "invalid password" })
        }

        const token = jwt.sign({
            id: userRow.recruiter_id,
            role: 'recruiter'
        }, process.env.JWT)

        res.cookie('token', token)

        return res.status(200).json({
            message: "User logged-in successfully",
            name: userRow.name,
            email: userRow.email,
            role: 'recruiter'
        })
        }

    })
}

module.exports = { studentLogin ,placementOfficerLogin,recruiterLogin}