📌 Placement Management System

A full-stack role-based campus recruitment platform that streamlines the placement process by connecting Students, Recruiters, and Placement Officers through a centralized system.

The system focuses on secure authentication, structured workflows, and scalable backend architecture.

🚀 Tech Stack
🖥 Backend
Node.js
Express.js
MySQL
JWT Authentication (Role-based access control)
Multer (file upload handling)
ImageKit (cloud resume storage)
🌐 Frontend
HTML
CSS
JavaScript (in development)
🧩 System Architecture

The system follows a role-based workflow architecture:

Student → Upload Profile → Placement Officer Review → Approval/Rejection → Recruiter Selection View
Fully decoupled frontend and backend design
RESTful API-based communication
Secure authentication using JWT tokens
👥 System Roles
👨‍🎓 Student
Register and login securely
Upload resume, CGPA, and branch details
Track application status in real-time
🧑‍💼 Recruiter
Register and login
Post job requirements (cutoff, role, eligibility criteria)
View shortlisted/selected candidates
🏫 Placement Officer
Manage overall placement workflow
Review job postings from recruiters
Approve or reject student applications
Control final selection status
🔐 Authentication & Security
JWT-based authentication system
Role-based route protection
Secure access control for Students, Recruiters, and Placement Officers
Middleware-based request validation
🎓 API Endpoints
🔑 Authentication Routes
POST /api/register/students
POST /api/register/recruiter
POST /api/register/placement_officer

POST /api/login/students
POST /api/login/recruiter
POST /api/login/placement_officer
👨‍🎓 Student Routes
POST /api/students/resume
→ Upload resume and update profile (CGPA, branch)

GET /api/students/applications
→ View application status
🧑‍💼 Recruiter Routes
POST /api/recruiter/cutoff
→ Submit job eligibility criteria

GET /api/recruiter/selected
→ View selected candidates
🏫 Placement Officer Routes
GET /api/placement_officer/get_jobs
→ View recruiter job requests

GET /api/placement_officer/get_applications
→ View all student applications

PUT /api/placement_officer/selected/:application_id
→ Approve or reject student applications
📂 Project Structure
placement_manager/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── db/
│   │   ├── services/
│   │   └── app.js
│   ├── server.js
│
└── frontend/
    ├── login/
    ├── dashboard/
    └── (in development)
⚙️ Setup Instructions
1. Clone the repository
git clone <repo-url>
cd placement_manager
2. Install backend dependencies
cd backend
npm install
3. Configure environment variables

Create a .env file in backend:

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL=
4. Run the server
node server.js
🌐 Frontend Status
Frontend is currently under active development
Backend is fully functional and independently testable via Postman
APIs are designed to be frontend-ready with structured responses
🔥 Key Features
Role-based authentication system (JWT)
Secure resume upload with cloud storage (ImageKit)
Complete placement workflow system
Modular and scalable backend architecture
RESTful API design
Separation of frontend and backend concerns
📌 Why this project matters

This system simulates a real-world campus recruitment platform and demonstrates:

Backend system design
Authentication and authorization
File upload and cloud integration
Database-driven workflows
Role-based access control
🚀 Future Improvements
React-based frontend dashboard
Real-time notifications system
Email integration for placement updates
Advanced analytics for placement officers
Deployment on cloud (AWS / Render / Vercel)
