const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const app = express();



const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
})


io.on('connect', (socket)=>{
    
    console.log( 'user connected.')

    socket.on('chat message',(msg)=>{
        console.log(msg)
        io.emit('chat message',msg) 
    })



    socket.on('disconnect', ()=>{      
        console.log('someone disconnected.')     
    })
})

server.listen(3000, () =>{
    console.log('Server running at port : 3000 ')
})