// import {User} from "./UserManager"
// import {UserManager} from "./UserManager"
// let GLOBAL_ROOM_ID = 1;
// // interface User{
// //     socket: Socket;
// //     name: string;
// // }
// interface Room {
//     user1: User,
//     user2: User,
// }

// export class RoomManager {
//   private rooms: Map<string, Room>;
//   constructor() {
//     this.rooms = new Map<string, Room>();
//   }

//   createRoom(user1: User, user2: User) {
//     const roomId = this.generate();
//     this.rooms.set(roomId.toString(), {
//       user1,
//       user2,
//     });
//     user1.socket.emit("send-offer", {
//       roomId,
//     });
//   }

//   onOffer(roomId: string, sdp: string) {
//     const user2 = this.rooms.get(roomId)?.user2;
//       user2?.socket.emit("offer", {
//         sdp,
//         roomId,
//       });
//     }
    
//   onAnswer(roomId: string, sdp: string) {
//     const user1 = this.rooms.get(roomId)?.user1;
//       user1?.socket.emit("answer", {
//         sdp,
//         roomId,
//       });
//   }

//   generate() {
//     return GLOBAL_ROOM_ID++;
//   }
// }
 import { User, UserManager } from "./UserManager";

 let GLOBAL_ROOM_ID = 1;

 interface Room {
   user1: User;
   user2: User;
 }

 export class RoomManager {
   private rooms: Map<string, Room>;
   constructor() {
     this.rooms = new Map<string, Room>();
   }

   createRoom(user1: User, user2: User) {
     const roomId = this.generate().toString();
     this.rooms.set(roomId.toString(), {
       user1,
       user2,
     });

     user1.socket.emit("send-offer", {
       roomId,
     });

     user2.socket.emit("send-offer", {
       roomId,
     });
   }

   onOffer(roomId: string, sdp: string, senderSocketid: string) {
     const room = this.rooms.get(roomId);
     if (!room) {
       return;
     }
     const receivingUser =
       room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
     receivingUser?.socket.emit("offer", {
       sdp,
       roomId,
     });
   }

   onAnswer(roomId: string, sdp: string, senderSocketid: string) {
     const room = this.rooms.get(roomId);
     if (!room) {
       return;
     }
     const receivingUser =
       room.user1.socket.id === senderSocketid ? room.user2 : room.user1;

     receivingUser?.socket.emit("answer", {
       sdp,
       roomId,
     });
   }

   onIceCandidates(
     roomId: string,
     senderSocketid: string,
     candidate: any,
     type: "sender" | "receiver"
   ) {
     const room = this.rooms.get(roomId);
     if (!room) {
       return;
     }
     const receivingUser =
       room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
     receivingUser.socket.emit("add-ice-candidate", { candidate, type });
   }

   generate() {
     return GLOBAL_ROOM_ID++;
   }
 }