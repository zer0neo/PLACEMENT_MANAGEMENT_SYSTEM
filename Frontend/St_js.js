// ==========================================
// RESUME FILE UPLOAD LISTENER
// ==========================================
const resumeInput = document.getElementById("resume");
const fileName = document.getElementById("fileName");

resumeInput.addEventListener("change", () => {
    if (resumeInput.files.length > 0) {
        const file = resumeInput.files[0];
        fileName.textContent = "✅ " + file.name;
    }
});

// ==========================================
// FORM VALIDATION & SUBMISSION LOGIC
// ==========================================
document.getElementById("studentForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const branch = document.getElementById("branch").value;
    const cgpa = document.getElementById("cgpa").value;

    if (branch === "") {
        alert("Please select your branch");
        return;
    }

    if (cgpa === "") {
        alert("Please enter your CGPA");
        return;
    }

    if (resumeInput.files.length === 0) {
        alert("Please upload your Resume");
        return;
    }

    const formData = new FormData();
    formData.append("branch", branch);
    formData.append("cgpa", cgpa);
    formData.append("resume_url", resumeInput.files[0]);

    try {
        const res = await fetch("http://localhost:5000/api/students/resume", {
            method: "POST",
            body: formData,
            credentials: "include"
        });
        
        if (res.ok) {
            alert("Profile submitted successfully!");
            window.location.href = "Student_Applications.html";
        } else {
            const data = await res.json();
            alert(data.message || "Submission failed");
        }
    } catch (err) {
        alert("Error connecting to server");
    }
});

// ==========================================
// VIEW APPLICATIONS ROUTING
// ==========================================
function viewApplications() {
    window.location.href = "PlacementOfficer_Applications.html";
}