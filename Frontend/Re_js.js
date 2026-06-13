document
.getElementById("jobForm")
.addEventListener("submit",function(e){

e.preventDefault();

const company =
document.getElementById("company").value;

const title =
document.getElementById("title").value;

const description =
document.getElementById("description").value;

const cgpa =
document.getElementById("cgpa").value;

const deadline =
document.getElementById("deadline").value;

if(
company === "" ||
title === "" ||
description === "" ||
cgpa === "" ||
deadline === ""
){
alert("Please fill all fields");
return;
}

alert("Job Posted Successfully!");

/*
Backend Connection Example

fetch("postJob",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
company,
title,
description,
cgpa,
deadline
})
});
*/

});

function checkStatus(){
    window.location.href = "Recruiter_Status.html";
}