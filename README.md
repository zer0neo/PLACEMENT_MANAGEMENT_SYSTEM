# 📌 Placement Management System

A full-stack role-based campus recruitment platform that streamlines the placement process by connecting **Students**, **Recruiters**, and **Placement Officers** through a centralized system.

The system focuses on secure authentication, structured workflows, and scalable backend architecture.

---

# 🚀 Tech Stack

## 🖥 Backend

* Node.js
* Express.js
* MySQL
* JWT Authentication (Role-Based Access Control)
* Multer (File Upload Handling)
* ImageKit (Cloud Resume Storage)

## 🌐 Frontend

* HTML
* CSS
* JavaScript *(In Development)*

---

# 🧩 System Architecture

The system follows a role-based workflow architecture:

**Student → Upload Profile → Placement Officer Review → Approval/Rejection → Recruiter Selection View**

* Fully decoupled frontend and backend design
* RESTful API-based communication
* Secure authentication using JWT tokens

---

# 👥 System Roles

## 👨‍🎓 Student

* Register and login securely
* Upload resume, CGPA, and branch details
* Track application status in real time

## 🧑‍💼 Recruiter

* Register and login
* Post job requirements (cutoff, role, eligibility criteria)
* View shortlisted and selected candidates

## 🏫 Placement Officer

* Manage overall placement workflow
* Review job postings from recruiters
* Approve or reject student applications
* Control final selection status

---

# 🔐 Authentication & Security

* JWT-based authentication
* Role-based route protection
* Secure access control for Students, Recruiters, and Placement Officers
* Middleware-based request validation

---

# 🎓 API Endpoints

## 🔑 Authentication Routes

```http
POST /api/register/students
POST /api/register/recruiter
POST /api/register/placement_officer

POST /api/login/students
POST /api/login/recruiter
POST /api/login/placement_officer
```

## 👨‍🎓 Student Routes

```http
POST /api/students/resume
```

Upload resume and update profile (CGPA, branch)

```http
GET /api/students/applications
```

View application status

## 🧑‍💼 Recruiter Routes

```http
POST /api/recruiter/cutoff
```

Submit job eligibility criteria

```http
GET /api/recruiter/selected
```

View selected candidates

## 🏫 Placement Officer Routes

```http
GET /api/placement_officer/get_jobs
```

View recruiter job requests

```http
GET /api/placement_officer/get_applications
```

View all student applications

```http
PUT /api/placement_officer/selected/:application_id
```

Approve or reject student applications

---

# 📂 Project Structure

```text
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
│   └── package.json
│
└── frontend/
    ├── login/
    ├── dashboard/
    └── (in development)
```

---

# ⚙️ Setup Instructions

## 1. Clone the Repository

```bash
git clone <repo-url>
cd placement_manager
```

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

## 3. Configure Environment Variables

Create a `.env` file inside `backend/`:

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL=
```

## 4. Run the Server

```bash
node server.js
```

---

# 🌐 Frontend Status

* Frontend is currently under active development.
* Backend is fully functional and independently testable via Postman.
* APIs are designed to be frontend-ready with structured responses.

---

# 🔥 Key Features

* Role-Based Authentication System (JWT)
* Secure Resume Upload with Cloud Storage (ImageKit)
* Complete Placement Workflow System
* Modular and Scalable Backend Architecture
* RESTful API Design
* Separation of Frontend and Backend Concerns

---

# 📌 Why This Project Matters

This system simulates a real-world campus recruitment platform and demonstrates:

* Backend system design
* Authentication and authorization
* File upload and cloud integration
* Database-driven workflows
* Role-Based Access Control

---

# 🚀 Future Improvements

* React-based frontend dashboard
* Real-time notification system
* Email integration for placement updates
* Advanced analytics for placement officers
* Deployment on AWS, Render, or Vercel
