import { Server } from "socket.io";

const io = new Server({
    cors:{
        origin: "http://localhost:4000"
    }
});

let onlineUsers = []

const addNewUser = (username, socketId) => {
    console.log(username)
    console.log(socketId)
    !onlineUsers.some(user => user.username === username) && 
        onlineUsers.push({username, socketId})
    console.log(onlineUsers)
};

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
};

const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
    
};

io.on("connection", (socket) => {
    console.log("Someone has connected!");
    socket.on("newUser", (username) => {
        addNewUser(username, socket.id)
        io.emit("test", onlineUsers)
    });
    socket.on("sendNotification", ({senderName, receiverName}) => {
        const receiver = getUser(receiverName)
        console.log(receiver)
        io.to(receiver.socketId).emit("getNotification", {
            senderName,
            receiverName,
        });
    });

  socket.on("disconnect", () => {
    console.log("Disconnected")
    removeUser(socket.id)
  });
});

io.listen(5001);