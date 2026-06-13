const db = require('../db/db');
const jwt = require('jsonwebtoken');

const selected_candidates = (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT);

    if (decoded.role !== 'recruiter') {
        return res.status(403).json({
            message: "Forbidden"
        });
    }

    const query = `
SELECT
s.name,
s.cgpa,
s.branch,
s.resume_url,
a.status,
j.recruiter_id
FROM applications a

JOIN students s
ON a.student_id=s.student_id

JOIN job j
ON a.job_id=j.job_id

WHERE a.status='selected'
`;

    db.query(query, [decoded.id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(result);
    });
};

module.exports = {
    selected_candidates
};