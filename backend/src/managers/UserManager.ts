// import { Socket } from "socket.io";
// import { RoomManager } from "./RoomManager";
// let GLOBAL_ROOM_ID = 1;
// export interface User{
//     socket: Socket;
//     name: string;
// }
// export class UserManager {
//   private users: User[];
//   private queue: string[];
//     private roomManager: RoomManager;
//   constructor() {
//     this.users = [];
//     this.queue = [];
//     this.roomManager= new RoomManager();
//   }
//   addUser(name: string, socket: Socket) {
//     this.users.push({ name, socket });
//       this.queue.push(socket.id);
//       socket.send("lobby");
//       this.clearQueue();
//       this.initHandlers(socket);
//   }
//     removeUser(socketId: string) {
//         const user = this.users.find(x => x.socket.id === socketId);
//     this.users= this.users.filter(x => x.socket.id === socketId);
//     this.queue = this.queue.filter(x => x === socketId);
//   }

//     clearQueue() {
//         console.log("inside clear queue")
//         console.log(this.queue.length)
//         if (this.queue.length < 2) {
//             return;
//         }
//         console.log(this.users);
//         console.log(this.queue);
//         const id1 = this.queue.pop();
//         const id2 = this.queue.pop();
//         console.log(" id is "+ id1 + " "+ id2);
//         const user1 = this.users.find(x => x.socket.id != id1);
//         const user2 = this.users.find(x => x.socket.id === id2);
//         console.log(user1)
//         console.log(user2)
//         if (!user1 || !user2) {
//             return;
//         }
//         // const roomId = this.generate();
//         // user1?.socket.emit("new-room", {
//         //     type: "send-offer",
//         //     room:this.generate()
//         // }
//         // )
//         console.log("creating room")
//         const room = this.roomManager.createRoom(user1, user2);
//         this.clearQueue()
//     }
    
//     generate() {
//         return GLOBAL_ROOM_ID++;
//     }

//     initHandlers(socket:Socket) {
//         socket.on("offer", ({ sdp,roomId}:{ sdp:string,roomId:string})=> {
//             this.roomManager.onOffer(roomId, sdp);
//         })
//         socket.on("answer", ({ sdp,roomId}:{ sdp:string,roomId:string})=> {
//             this.roomManager.onOffer(roomId, sdp);
//         })
//     }
// }
import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";
export interface User {socket: Socket; name: string; }
export class UserManager {
  private users: User[];
  private queue: string[];
  private roomManager: RoomManager;
  constructor() {
    this.users = [];
    this.queue = [];
    this.roomManager = new RoomManager();
  }
  addUser(name: string, socket: Socket) {
    this.users.push({
      name,
      socket,
    });
    this.queue.push(socket.id);
    socket.emit("lobby");
    this.clearQueue();
    this.initHandlers(socket);
  }
  removeUser(socketId: string) {
    const user = this.users.find((x) => x.socket.id === socketId);

    this.users = this.users.filter((x) => x.socket.id !== socketId);
    this.queue = this.queue.filter((x) => x === socketId);
  }
  clearQueue() {
    console.log("inside clear queues");
    console.log(this.queue.length);
    if (this.queue.length < 2) {
      return;
    }
    const id1 = this.queue.pop();
    const id2 = this.queue.pop();
    console.log("id is " + id1 + " " + id2);
    const user1 = this.users.find((x) => x.socket.id === id1);
    const user2 = this.users.find((x) => x.socket.id === id2);
    if (!user1 || !user2) {
      return;
    }
    console.log("creating roonm");
    const room = this.roomManager.createRoom(user1, user2);
    this.clearQueue();
  }
  initHandlers(socket: Socket) {
    socket.on("offer", ({ sdp, roomId }: { sdp: string; roomId: string }) => {
      this.roomManager.onOffer(roomId, sdp, socket.id);
    });
    socket.on("answer", ({ sdp, roomId }: { sdp: string; roomId: string }) => {
      this.roomManager.onAnswer(roomId, sdp, socket.id);
    });
    socket.on("add-ice-candidate", ({ candidate, roomId, type }) => {
      this.roomManager.onIceCandidates(roomId, socket.id, candidate, type);
    });
  }
}