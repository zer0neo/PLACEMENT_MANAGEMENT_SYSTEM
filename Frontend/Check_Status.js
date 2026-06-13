document.addEventListener("DOMContentLoaded", async () => {
    console.log("Applicant Status Page Loaded");

    try {
        const res = await fetch("http://localhost:5000/api/recruiter/selected", {
            credentials: "include"
        });
        
        if (res.ok) {
            const candidates = await res.json();
            const tbody = document.getElementById("studentTableBody");
            tbody.innerHTML = "";
            
            candidates.forEach(cand => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${cand.name}</td>
                    <td>${cand.cgpa}</td>
                    <td>${cand.branch}</td>
                    <td><a href="${cand.resume_url}" target="_blank">View Resume</a></td>
                    <td>
                        <span class="status accepted">
                            ${cand.status.charAt(0).toUpperCase() + cand.status.slice(1)}
                        </span>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            console.error("Failed to load candidates");
        }
    } catch (err) {
        console.error("Error fetching candidates:", err);
    }
});