document.addEventListener("DOMContentLoaded", async () => {
    const tbody = document.getElementById("applications-tbody");
    
    // Fetch applications
    try {
        const res = await fetch("http://localhost:5000/api/placement_officer/get_applications", {
            credentials: "include"
        });
        
        if (res.ok) {
            const applications = await res.json();
            tbody.innerHTML = "";
            
            applications.forEach(app => {
                const tr = document.createElement("tr");
                
                tr.innerHTML = `
                    <td>${app.name}</td>
                    <td>${app.branch}</td>
                    <td>${app.email}</td>
                    <td>${app.cgpa}</td>
                    <td><a href="${app.resume_url}" target="_blank">View Resume</a></td>
                    <td>
                        <select class="status-select" data-appid="${app.application_id}">
                            <option value="pending" ${app.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="selected" ${app.status === 'selected' ? 'selected' : ''}>Selected</option>
                            <option value="rejected" ${app.status === 'rejected' ? 'selected' : ''}>Rejected</option>
                        </select>
                    </td>
                    <td>
                        <button class="submit-btn" onclick="updateStatus(${app.application_id}, this)">
                            Submit
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
    } catch (err) {
        console.error("Error fetching applications:", err);
    }
});

async function updateStatus(applicationId, buttonElement) {
    const row = buttonElement.closest("tr");
    const selectElement = row.querySelector(".status-select");
    const status = selectElement.value;
    
    if (status === 'pending') {
        alert("Please select 'selected' or 'rejected'.");
        return;
    }

    try {
        const res = await fetch(`http://localhost:5000/api/placement_officer/selected/${applicationId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status }),
            credentials: "include"
        });
        
        if (res.ok) {
            alert(`Application status updated to ${status}`);
        } else {
            const data = await res.json();
            alert(data.message || "Failed to update status");
        }
    } catch (err) {
        alert("Error connecting to server");
    }
}

function viewApplications(){
    window.location.href = "Job_Listings.html";
}