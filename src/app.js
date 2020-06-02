const express =require('express');
const socketio=require('socket.io');
var path = require('path');
const app=express();
const date=require('./util/date');
const {addUser,removeUser,getUser,getUserInRoom}=require('./util/user');

//Setting directory and ejs
app.set('view engine','ejs');
Directory=path.join(__dirname,'../public')
app.use(express.static(Directory));

app.get("/",function(req,res){
    res.render('join');
});

//Server listening
const expressServer=app.listen(process.env.PORT||3000,()=>{
    console.log('server started!');
})

const io=socketio(expressServer);
io.on('connect',(socket)=>{
    // console.log(date('Welcome!!!!'))
    socket.on('join',({username,room})=>{
        console.log(room);
        socket.join(room);
        
        // let flag=0;
        // for(let i=0;i<users.length;i++)
        // {
        //     if(users[i].username==username)
        //     {
        //         flag=1;
        //         break;
        //     }
        // }
        addUser({id:socket.id,username,room});
        const users=getUserInRoom(room);
        socket.broadcast.to(room).emit("message",date(`${username} has joined the room`));
        io.to(room).emit('userlist',users)
        
    });
    socket.on('newmessage',(msg)=>{
        const user=getUser(socket.id);
        io.to(user.room).emit('broadmess',{name:user.username,msg:date(msg)});
    })
    socket.on('newmessage1',(msg)=>{
        const user=getUser(socket.id);
        io.to(user.room).emit('broadmess1',{name:user.username,msg:date(msg)});
    })
    socket.on('disconnect',()=>{
        const user=removeUser(socket.id);
        if(user){
            const users=getUserInRoom(user.room);
        io.to(user.room).emit('userlist',users)
        io.to(user.room).emit('message',date(`${user.username} left!!`));
        }
    });
});
