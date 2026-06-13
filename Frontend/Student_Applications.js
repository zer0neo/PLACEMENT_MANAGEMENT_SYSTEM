document.addEventListener("DOMContentLoaded", async () => {
    console.log("Student Applications Loaded Successfully");

    try {
        const res = await fetch("http://localhost:5000/api/students/applications", {
            credentials: "include"
        });
        
        if (res.ok) {
            const applications = await res.json();
            const tbody = document.getElementById("applications-tbody");
            tbody.innerHTML = "";
            
            applications.forEach(app => {
                const dateApplied = new Date(app.applied_at).toLocaleDateString();
                const statusClass = app.status === 'selected' ? 'accepted' : app.status === 'rejected' ? 'rejected' : 'pending';
                
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${app.title}</td>
                    <td>${app.company_name}</td>
                    <td>${dateApplied}</td>
                    <td>
                        <span class="status ${statusClass}">
                            ${app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            console.error("Failed to load applications");
        }
    } catch (err) {
        console.error("Error fetching applications:", err);
    }
});