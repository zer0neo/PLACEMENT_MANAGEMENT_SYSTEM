const db = require('../db/db');
const jwt = require('jsonwebtoken');

const selectStudent = (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT);

    if (decoded.role !== 'placement_officer') {
        return res.status(403).json({
            message: "Forbidden"
        });
    }

    const { application_id } = req.params;

    const query = `
        UPDATE applications
        SET status = 'selected'
        WHERE application_id = ?
    `;

    db.query(query, [application_id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        return res.status(200).json({
            message: "Student selected successfully"
        });
    });
};

module.exports = { selectStudent };