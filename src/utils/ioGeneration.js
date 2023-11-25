import { Server } from "socket.io";


let io;

// Initiate IO 
export function initiateIo(server) {
    io = new Server(server)
    return io
}

// Reuse IO whereever in your code 

export function IO() {
    if (!io) {
        return next(new Error("No io", { cause: 400 }))
    }
    return io
}