const { Server } = require("socket.io");

let io;

exports.init = (httpServer) => {
  io = new Server(httpServer);
  return io;
};

exports.getIO = () => {
  if (!io) throw new Error("Socket.io is not initialized!");
  return io;
};
