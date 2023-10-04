import { React, useState, useEffect } from "react";
import socket from "../socket";
import jsCookie from "js-cookie";
let username  =  jsCookie.get("username");

export default function Dev() {



  const [contain, setContain] = useState("");
  const [message, setMessage] = useState([]);
  const [socketId, setSocketId] = useState("");

  let access_token = jsCookie.get("access");

  useEffect(() => {
    
    let previous_messages =  localStorage.getItem("message-dev")
    
    if(previous_messages){
      previous_messages = JSON.parse(previous_messages)
      setMessage(previous_messages)  
    }

    return () => { }
  }, [])
  



  useEffect(() => {
    socket.connect();
    socket.emit("join", access_token);
    socket.on("join:back", (msg) => {
      setSocketId(msg.socketId);
    });

    socket.on("dev:back", ({ contain , sender }) => {
        setMessage((prev) => [...prev, { contain: contain, sender: sender , self: false }]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);




  function sendMessage() {
    if (contain !== "") {
      setMessage([...message, { contain: contain, sender:username , self: true }]);
      setContain("");
      socket.emit("dev", {
        contain: contain,
        username : username,
      });
      localStorage.setItem("message-dev" ,JSON.stringify(message))
    }
  }

  useEffect(() => {
    localStorage.setItem("message-dev" ,JSON.stringify(message))
    return () => {}
  }, [message])


  return (
    <div className="container">
       Dev Group 
      {message.map((item) => {
        if (item.self) {
          return (
            <div key={Math.random()}>
              <div style={{ float: "right" }}>{item.contain} </div>
              <br />
            </div>
          );
        } else {
          return (
            <div key={Math.random()}>
              <div> {item.contain}</div>
              <br />
            </div>
          );
        }
      })}
      
      <br />
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Message..."
          value={contain}
          onChange={(e) => {
            setContain(e.target.value);
          }}
        />
        <button className="btn btn-warning" type="button" onClick={sendMessage}>
          Through
        </button>
      </div>
      <small> Your socket id {socketId}</small>
    </div>
  );
}
