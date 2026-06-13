document.addEventListener("DOMContentLoaded", async () => {
    console.log("Job Listings Page Loaded");

    try {
        const res = await fetch("http://localhost:5000/api/placement_officer/get_jobs", {
            credentials: "include"
        });
        
        if (res.ok) {
            const jobs = await res.json();
            const tbody = document.getElementById("jobTableBody");
            tbody.innerHTML = "";
            
            jobs.forEach(job => {
                const deadline = new Date(job.deadline).toLocaleDateString();
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${job.title}</td>
                    <td>${job.description}</td>
                    <td>${job.min_cgpa}</td>
                    <td>${deadline}</td>
                    <td>${job.company_name}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            console.error("Failed to load jobs");
        }
    } catch (err) {
        console.error("Error fetching jobs:", err);
    }
});