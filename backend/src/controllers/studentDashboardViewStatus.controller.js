const db = require('../db/db');
const jwt = require('jsonwebtoken');

const getStudentApplications = (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT);

    if (decoded.role !== 'student') {
        return res.status(403).json({
            message: "Forbidden"
        });
    }

    const query = `
        SELECT
            j.title,
            j.company_name,
            a.applied_at,
            a.status
        FROM applications a
        JOIN job j
            ON a.job_id = j.job_id
        WHERE a.student_id = ?
    `;

    db.query(query, [decoded.id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }
        

        return res.status(200).json(result);
    });
};

module.exports = { getStudentApplications };