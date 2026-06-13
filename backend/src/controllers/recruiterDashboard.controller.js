const db = require('../db/db')
const jwt = require('jsonwebtoken')


const recruiterCutOff = (req, res) => {
t
    const query1 = "insert into job(recruiter_id,title,description,min_cgpa,deadline,company_name) values(?,?,?,?,?,?)" 

    const { title, description, min_cgpa, deadline, company_name } = req.body
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT)

    if(!token) {
        return res.status(401).json({message : "user unauthorized"})
    }else if(decoded.role != 'recruiter') {
        return res.status(403).json({message : " u are forbidden to send cutoff"})
    }

    
        db.query(query1,[decoded.id,title,description,min_cgpa,deadline,company_name], (err,result) => {
            if(err) {
                res.status(200).json(err)
            }else
            return res.status(200).json({message:"Cutoff details sent to placement-officer"})
       
    })

        
   
}

module.exports = { recruiterCutOff }