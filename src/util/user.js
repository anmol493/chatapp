//User array to store information
users=[];

//Add new user
function addUser({id,username,room}){
    username=username.trim();
    room=room.trim();
    username=username.toLowerCase();
    room=room.toLowerCase();
    if(!username || !room)
    {
        return{
            error:'The Username or room is empty'
        }
    }
    for(var i=0;i<users.length;i++)
    {
        if(users[i].username===username && users[i].room===room)
        {
            return {
                error:'Username already exists'
            }
        }
    }
    user={id,username,room};
    users.push(user);

    return { user };
};

//Remove User
function removeUser(id){
    for(var i=0;i<users.length;i++)
    {
        if(id===users[i].id)
        {
            const user=users[i];
            users.splice(i,1);
            return user;
        }
    }
    return {
        error:'User not found'
    }
}

//getUser
function getUser(id){
    for(var i=0;i<users.length;i++)
    {
        if(id===users[i].id)
        {
            return users[i]
        }
    }
    return {
        error:'No user found'
    }
}

//getUserInRoom
function getUserInRoom(room){
    rooms=[];
    for(var i=0;i<users.length;i++)
    {
        if(room===users[i].room)
        {
            rooms.push(users[i]);
        }
    }
    return rooms;
}

module.exports={
    addUser,
    removeUser,
    getUser,
    getUserInRoom
};
// addUser({id:0,username:'Anmol',room:'ert'});
// addUser({id: 1,username:'An',room:'ert'});
// addUser({id:2,username:'Anm',room:'ert'});
// addUser({id:3,username:'Anmo',room:'Hert'});
// console.log(users);
// console.log(getUserInRoom('ert'));
// console.log(getUser(1));