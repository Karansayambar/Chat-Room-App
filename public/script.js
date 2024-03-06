const socket = io();
let username = "";
document.getElementById("join-btn").addEventListener("click", (event) => {
    event.preventDefault();
    username = document.getElementById("username-input").value.trim();
    console.log(username);
    if(!username){
        alert("please enter a username");
    }else{
        //enter in chat
        document.getElementById("form").style.display ="none";
        document.getElementById("chatRoom").style.display = "block";

        document.getElementById("header").textContent = `Chatroom - ${username}`;
        socket.emit("joined", username);
    }
})
document.getElementById("send-btn").addEventListener("click", ()=> {
    let message = document.getElementById("message-input").value.trim();
    socket.emit("message sent", message,username);
});

socket.on("message sent",(data)=> {
    if(data.username === username){
        showmessage(data, true);
    }else{
        showmessage(data, false);
    }
})

function showmessage(message, mine){
    if(mine){
        document.getElementById("messages-container").innerHTML += 
        `
        <div class="message sent">${message.username}: ${message.message}</div>
        `
    }else{
        document.getElementById("messages-container").innerHTML += 
        `<div class="message received">${message.username}: ${message.message}</div>
        `
    }
}

socket.on("joined", (username) => {
    if (data.username !== username) {
        document.getElementById("messages-container").innerHTML +=
            `<div>${username} has joined</div>`;
    }
});

  