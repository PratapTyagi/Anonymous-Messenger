const socket = io("http://localhost:8000");

const form = document.querySelector("#form");
const msgInput = document.querySelector(".msgInput");
const msgContainer = document.querySelector(".container");

const audio = new Audio("./sound.mp3");

const name = prompt("Enter your name: ");
socket.emit("new-user-joined", name);

const append = (message, position) => {
  const joinMessage = document.createElement("div");
  joinMessage.classList.add("message");
  joinMessage.classList.add(position);
  joinMessage.innerText = message;
  msgContainer.append(joinMessage);
  if (position == "left") audio.play();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = msgInput.value;
  append(message, "right");
  socket.emit("send", message);
  msgInput.value = "";
});

socket.on("user-joined", (name) => {
  append(`${name}: Joined the chat`, "right");
});

socket.on("receive", (data) => {
  append(`${data.name}: ${data.msg}`, "left");
});

socket.on("user-left", (name) => {
  append(`${name}: left`, "left");
});

// const appendMessages = (data, position) =>{
//     const message = document.createElement('div');
//     const span = document.createElement('span');
//     span.classList.add('name');
//     span.innerText = `${data.name}`;
//     message.append(span);
//     message.innerText = `${data.msg}`;
//     message.classList.add('message');
//     message.classList.add(position);
//     msgContainer.append(message);
// };
