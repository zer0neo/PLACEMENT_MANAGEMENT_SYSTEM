// ==========================================
// SUBMIT STATUS TO WORKFLOW
// ==========================================
document.querySelectorAll(".submit-btn").forEach(function(button){
    button.addEventListener("click",function(){
        const row = button.closest("tr");
        const studentName = row.cells[0].textContent;
        const status = row.querySelector(".status-select").value;

        alert(studentName + " status updated to " + status);

        /*
        Backend Integration Example
        fetch("/updateStatus",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                studentName:studentName,
                status:status
            })
        });
        */
    });
});

// ==========================================
// VIEW APPLICATIONS ROUTING
// ==========================================
function viewApplications(){
    window.location.href = "PlacementOfficer_Applications.html";
}