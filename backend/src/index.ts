
// import { Server } from "socket.io";
import express from 'express';
import { Socket } from "socket.io";
import { Server } from "socket.io";
import http from "http";
import { UserManager } from './managers/UserManager';
// const { createServer } = require("node:http");
// const express = require("express");
const { join } = require("node:path");
// const { Server } = require("socket.io");

const app = express();
// const server = createServer(app);
const server = http.createServer(http);

const io = new Server(server, {
  cors: {
    origin:"*"
  }
  
});

const userManager = new UserManager();
io.on("connection", (socket:Socket) => {
  console.log("a user connected");
  userManager.addUser("randomname", socket);
  socket.on("disconnect", () => {
    userManager.removeUser(socket.id)
  })
});

server.listen(3000, () => {
  console.log("listening on :3000");
});