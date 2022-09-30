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
var users = 1

io.on('connect', (socket)=>{
    console.log( 'user connected.')
    socket.on('online', ()=>{
        users += 1
        console.log('Get online event : ' + users)      
        io.emit('online', {
            user : users
        })
    })
    socket.on('chat message',(msg)=>{
        console.log(msg)
        io.emit('chat message',msg) 
    })
    socket.on('disconnect', ()=>{      
        console.log('someone disconnected.')
        users -= 1
        io.emit('offline',{
            user : users 
        })
        
    })
})

server.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });