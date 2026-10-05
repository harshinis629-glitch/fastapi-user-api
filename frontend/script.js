const API_URL="http://127.0.0.1:8000";

const userForm=document.getElementById("userForm");
const userList=document.getElementById("usersList");

//CREATE USER
userForm.addEventListener("submit",async function(event){
    event.preventDefault();

    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const age=document.getElementById("age").value;

    const response=await fetch(`${API_URL}/users`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            email:email,
            age:Number(age)
        })
    });
    if(response.ok){
        alert("User created successfully");
        userForm.reset();
        loadUsers();
    }
    else{
        const error=await response.json();
        alert("Error: "+JSON.stringify(error));
    }

});

//GET ALL USERS
async function loadUsers(){
    const response=await fetch(`${API_URL}/users`);
    const users=await response.json();

    userList.innerHTML="";
    if(users.length==0){
        userList.innerHTML="<p> No users found </p>";
        return;
    }
    users.forEach(user=>{
         const userCard = document.createElement("div");

        userCard.className = "user-card";

        userCard.innerHTML = `
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Age:</strong> ${user.age}</p>
            <p><strong>ID:</strong> ${user.id}</p>
        `;

        userList.appendChild(userCard);
    });

}
//load user when page opens
loadUsers();

