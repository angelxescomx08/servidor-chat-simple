const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const getRoutes = require('./routes/getRoutes')
const puerto = process.env.PORT || 5000

const {usuarios, addUsuario, destinoSocket, deleteUsuario} = require('./js/usuarios')

app.use(getRoutes)
app.use(cors())

io.on('connect', (socket) => {
    socket.on('usuario',({usuario})=>{
        addUsuario(usuario,socket)
        const users = []
        usuarios.map(({usuario})=>{
            users.push(usuario)
        })
        io.emit('conectados',users)
        console.table(usuarios)
    })

    socket.on('enviar',({usuario, destino, msg})=>{
        if(destino!==undefined){
            const socketDestino = destinoSocket(destino)
            socketDestino.emit('recibir',{"usuario":usuario,"msg":msg})
        }
        console.log(`${usuario}:${msg} a ${destino}`)
    })
    socket.on('disconnect', () => {
        console.log('Se ha desconectado un usuario')
        deleteUsuario(socket)
        console.table(usuarios)
    })
})

server.listen(puerto, () => {
    console.log(`Escuchando en el puerto ${puerto}`)
})