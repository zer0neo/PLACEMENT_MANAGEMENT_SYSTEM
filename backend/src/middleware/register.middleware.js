const bcrypt = require('bcryptjs')
const db = require('../db/db')
const authMiddleware =(table)=>{
   return (req,res,next) => {
      const { name, email, password } = req.body


    const query1 = `select * from ${table} where name=? or email=?`
    
    db.query(query1, [name, email], async (err, result) => {
        if (err) {
            return res.status(500).json({ message: "database error" })
        }

        if (result.length > 0) {
            return res.status(409).json({ message: "duplicate name/email can't be inserted" })
        }
         req.hash = await bcrypt.hash(password, 10)  //using req. to pass an extra property from middleware to external function
         next()
        })

       
}
} 

module.exports  = {authMiddleware}