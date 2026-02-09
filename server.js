const express =require('express');
const app =express();
const port = 3000;

 app.use(express.json());
 app.use(express.static('public'));

 const http = require('http');
 const {Server} = require('socket.io');
 const server = http.createServer(app);
const io = new Server(server);


io.on('connection',(socket)=>{
console.log('client connected',socket.id);

socket.on('sharenote',({sharenotes})=>{
    io.emit('sharenote',{message:sharenotes});
})

socket.on('disconnect',()=>{
    console.log(`client disconnected`,socket.id);
    
})
})



 const aunthenticate = require('./routes/auth');
 app.use('/aunthenticate',aunthenticate)

 const notestask = require('./routes/notes');

 app.use('/notestask',notestask);


 server.listen(port,()=>{
    console.log(`your app is live at http://localhost:${port}`);
    
 })