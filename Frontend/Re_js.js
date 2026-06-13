document.getElementById("jobForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const company_name = document.getElementById("company").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const min_cgpa = document.getElementById("cgpa").value;
    const deadline = document.getElementById("deadline").value;

    if(company_name === "" || title === "" || description === "" || min_cgpa === "" || deadline === ""){
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/recruiter/cutoff", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                company_name,
                title,
                description,
                min_cgpa,
                deadline
            }),
            credentials: "include"
        });

        if (res.ok) {
            alert("Job Posted Successfully!");
            document.getElementById("jobForm").reset();
        } else {
            const data = await res.json();
            alert(data.message || "Failed to post job");
        }
    } catch (err) {
        alert("Error connecting to server");
    }
});

function checkStatus(){
    window.location.href = "Recruiter_Status.html";
}