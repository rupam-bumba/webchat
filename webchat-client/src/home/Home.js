import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import socket from "../socket";
import jsCookie from "js-cookie";



export default function Home() {
  const [usersList, setUsersList] = useState([]);
  let access_token = jsCookie.get("access");
  const [onlineUsers, setOnlineUsers] = useState({})

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/users/list-users`)
      .then((response) => {
        console.log(response.data);
        setUsersList(response.data);
        
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {};
  }, []);


  useEffect(() => {
    socket.connect();
    socket.emit("join", access_token);
   
    socket.on("users:all", ( allUsers )=> {
      
      let userObj = {}
      for (let keys in allUsers){
        console.log( "------->>>>  " , allUsers[keys].v.userId,allUsers[keys].v.userName  );
        userObj[keys] =  { userId: allUsers[keys].v.userId , userName : allUsers[keys].v.userName  }
      }
      console.log(  userObj);
      setOnlineUsers(userObj)
    })

    socket.on("users:join", ( {userId, userName, socketId })=> {
      setOnlineUsers( (prev)=> ({...prev , [socketId]: {userId, userName } }) )
    })

    socket.on("users:leave", (socketId)=> {
      setOnlineUsers(  (prev) => {
        delete prev[socketId]
        return  prev  
      } )
    })

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    }
  }, [socket])


  






  return (
    <div>
      <div className="container">
      <Link style={{textDecoration : "none"}} to={"/dev"} > 
        <div style={{textDecoration : "none"}} className="alert alert-danger alert-link" role="alert"> [ V 0.0.1 ] Dev Group </div>
      </Link>


      {
        Object.keys(onlineUsers).map((keys) => {
          return (
            <Link
              key={keys}
              to={"/chats/" +onlineUsers[keys].userId +"/" + onlineUsers[keys].userName}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="alert alert-success" role="alert">
                {"[" + keys.slice(0, 3) +"] ["+ onlineUsers[keys].userId.slice(0, 10) + "...] \t" + onlineUsers[keys].userName}
              </div>
             
            </Link>
          )
        })
      }

        {Object.keys(usersList).map((keys) => {
          return (
            <Link
              key={keys}
              to={
                "/chats/" +
                usersList[keys]._id +
                "/" +
                usersList[keys].users_name
              }
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="alert alert-warning" role="alert">
                {"[" + usersList[keys]._id.slice(0, 10) + "...] \t" + usersList[keys].users_name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
