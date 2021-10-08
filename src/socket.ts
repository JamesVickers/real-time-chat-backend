import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import { getTimeStamp } from "./utils/functions";
import logging from "./utils/logging";

const NAMESPACE = "Socket";

const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_MESSAGE: "CREATE_ROOM",
    // CREATE_ROOM: "CREATE_ROOM",
    // CREATE_ROOM_MESSAGE: "CREATE_ROOM_MESSAGE",
    // JOIN_ROOM: "JOIN_ROOM",
  },
  SERVER: {
    NEW_MESSAGE: "NEW_MESSAGE",
    // ROOMS: "ROOMS",
    // JOINED_ROOM: "JOINED_ROOM",
    // NEW_ROOM_MESSAGE: "NEW_ROOM_MESSAGE",
  },
};

const socket = ({ io }: { io: Server }) => {
  logging.info(NAMESPACE, `Sockets enabled`);

  io.on(EVENTS.connection, (socket: Socket) => {
    logging.info(NAMESPACE, `Socket connected, socket id: ${socket.id}`);
    // console.log("Socket connected, full socket: ", socket);

    socket.on("chat", (payload) => {
      // console.log("chat payload: ", payload);
      io.emit("chat", payload);
    });
  });
};

export default socket;
