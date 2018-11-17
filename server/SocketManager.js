const io = require('./index.js').io;
const {VERIFY_USER,USER_CONNECTED,LOGOUT} = require('../react-ui/src/Events');
const {createUser} = require('../react-ui/src/Factories');

let connectedUser = {}

addUser = (userList,user) =>{
    let newList = Object.assign({},userList)
    newList[user.name] = user
    return newList
}
removeUser = (userList,username) =>{
    let newList = Object.assign({},userList)
    delete newList[username]
    return newList
}

isUser = (userList,username) =>{
    return username in userList
}
module.exports = function(socket){
    console.log(`Socket ID: ${socket.id}`)

    socket.on(VERIFY_USER,(nickname,callback)=>{
        if(isUser(connectedUser,nickname)){
            callback({isUser:true, user:null})
        }else{
            callback({isUser:false,user:createUser({name:nickname})})
        }
    })

    socket.on(USER_CONNECTED, (user)=>{
        connectedUser = addUser(connectedUser,user)
        socket.user = user
        io.emit(USER_CONNECTED,connectedUser)
        console.log(connectedUser);
    })
}