import { globalResponse } from "./errorHandler.js"
import { nanoid } from "nanoid";
import roomRoutes from '../modules/room/room.routes.js'
import { IO, initiateIo } from "./ioGeneration.js";
import { ExpressPeerServer } from "peer";

export const initiateApp = (app, express) => {

    const port = +process.env.PORT || 5000


    // parsing any requested data
    app.use(express.json());

    app.use(cors())

    const server = app.listen(port, () => { console.log(`...Server is running on Port ${port}`); })

    const peerServer = ExpressPeerServer(server, {
        debug: true
    });

    // peerServer
    app.use('/peerjs', peerServer);

    // default router
    app.get('/', (req, res) => {

        res.redirect(`/room/${nanoid()}`)
    })


    //  Section Requests On RESTful APIs
    app.use('/room', roomRoutes)



    // Global response for any (expected) fail case 
    app.use(globalResponse)

    // router in case there's no routers match
    app.all('*', (req, res) => { res.status(404).json({ Message: "404 Not fount URL" }) })



    // Socket.io section
    const io = initiateIo(server)

    io.on('connection', (socket) => {

        socket.on('join-room', (roomId, userId) => {
            socket.join(roomId);
            socket.to(roomId)
            socket.broadcast.emit('user-connected', userId);
            socket.on('message', (message) => {
                socket.to(roomId)
                socket.emit('createMessage', message)
            })
            socket.on('disconnect', () => {
                socket.to(roomId)
                socket.broadcast.emit('user-disconnected', userId)
            })
        })
    })

}
