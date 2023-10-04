let getUserId = require("./api/helper/get_user_id");
const NodeCache = require( "node-cache" );
const cache = new NodeCache();


module.exports = (socket) => {
  console.log("socket\t::\tconnects: " + socket.id);




  socket.on("join", (access) => {
    let {users_id,users_name} = getUserId(access);
   
    if (users_id !== false) {
      socket.join("network")
      socket.join(users_id);
      socket.join("dev");
      cache.set( socket.id , {userId: users_id, userName: users_name, socketId : socket.id })
      socket.emit("join:back", { socketId: socket.id });
      socket.to("network").emit("users:join", {userId: users_id, userName: users_name, socketId : socket.id } );
    }
     
  });


  socket.on("private", ({ contain, receiver, auth }) => {
    let {userid,usersname} = getUserId(auth);
    if (userid !== false) {
      socket
        .to(receiver)
        .to(userid)
        .emit("private:back", { sender: userid, contain: contain });
    }
  });

  socket.on("dev", ({ contain, username }) => {
    socket.broadcast.emit("dev:back", { contain: contain, sender: username });
  });

  socket.on("typing", ({ contain, receiver, auth }) => {
    let {userid,usersname} = getUserId(auth);
    
    if (userid !== false) {
      socket
        .to(receiver)
        .to(userid)
        .emit("typing:back", { sender: userid, contain: contain });
    }
  });













  socket.emit("users:all", cache.data );

  socket.on("disconnect", () => {
    console.log("socket\t::\tdisconnects: "+socket.id);
    socket.to("network").emit("users:leave",socket.id);
    cache.del( socket.id )
  });
};
