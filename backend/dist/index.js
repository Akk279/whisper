"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Server } from "socket.io";
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
// const { createServer } = require("node:http");
// const express = require("express");
const { join } = require("node:path");
// const { Server } = require("socket.io");
const app = (0, express_1.default)();
// const server = createServer(app);
const server = http_1.default.createServer(http_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
io.on("connection", (socket) => {
    console.log("a user connected");
});
server.listen(3000, () => {
    console.log("listening on :3000");
});
