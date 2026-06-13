const db = require('../db/db');
const jwt = require('jsonwebtoken');

const getApplications = (req, res) => {

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

    const query = `
        SELECT
            a.application_id,
            s.student_id,
            s.name,
            s.email,
            s.branch,
            s.cgpa,
            s.resume_url,
            a.status,
            j.job_id,
            j.title,
            j.company_name
        FROM applications a
        JOIN students s
            ON a.student_id = s.student_id
        JOIN job j
            ON a.job_id = j.job_id
    `;

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(result);
    });
};

module.exports = { getApplications };