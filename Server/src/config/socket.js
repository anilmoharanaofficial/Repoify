import { Server } from "socket.io";

let user = "test";

const connectToSocket = (server) => {
  const io = new Server(server);

  io.on("Connection", (socket) => {
    socket.on("joinRoom", (userID) => {
      user = userID;
      console.log("=====");
      console.log(user);
      console.log("=====");
      socket.join(userID);
    });
  });

  return io;
};

export default connectToSocket;
