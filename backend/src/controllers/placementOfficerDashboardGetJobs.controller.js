const db = require('../db/db')
const jwt = require('jsonwebtoken')


const getJobs = (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT);

    if (decoded.role !== "placement_officer") {
        return res.status(403).json({
            message: "Forbidden"
        });
    }

    const query = "SELECT * FROM job";

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(result);
    });
};

module.exports = {getJobs}