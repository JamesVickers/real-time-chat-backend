import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import config from "../config/config";
import logging from "./utils/logging";
import { version } from "../package.json";
import socket from "./socket";

const NAMESPACE = "Server"; /* determines where logs are comming from */

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: config.server.corsOrigin,
    credentials: true,
  },
});

// not using the req object on this endpoint so used an underscore
app.get("/", (_, res) => {
  res.send(`Server version ${version} is up`);
});

// listen on the server not on the express app
httpServer.listen(config.server.port, () => {
  logging.info(
    NAMESPACE,
    `Server version ${version} listening on ${config.server.hostname}:${config.server.port}`
  );
  socket({ io });
});
