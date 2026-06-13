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
document.getElementById("studentForm").addEventListener("submit", function(e) {
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

    alert("Profile submitted successfully!");
});

// ==========================================
// VIEW APPLICATIONS ROUTING
// ==========================================
function viewApplications() {
    window.location.href = "PlacementOfficer_Applications.html";
}