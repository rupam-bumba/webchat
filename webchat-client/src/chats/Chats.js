import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import jsCookie from "js-cookie";

export default function Chats() {
  let { rec } = useParams();
  let { usr } = useParams();

  const [contain, setContain] = useState("");
  const [message, setMessage] = useState([]);
  const [socketId, setSocketId] = useState("");
  const [typing, setTyping] = useState("")


  let access_token = jsCookie.get("access");

  useEffect(() => {
    
    let previous_messages =  localStorage.getItem("message-" + rec)

    console.log(previous_messages);

    if(previous_messages){
      previous_messages = JSON.parse(previous_messages)
      setMessage(previous_messages)  
    }
 
    return () => { }
  }, [socket])
  

  useEffect(() => {
    socket.connect();
    socket.emit("join", access_token);
    socket.on("join:back", (msg) => {
      setSocketId(msg.socketId);
    });

    socket.on("private:back", ({ sender, contain }) => {
      setMessage((prev) => [...prev, { contain: contain, self: false }]);
      localStorage.setItem( "message-" + rec,JSON.stringify(message))
    });

    socket.on("typing:back", ({ sender, contain }) => {
      setTyping(contain);
    });



    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);


  useEffect(() => {
    socket.emit("typing", {
      contain: contain,
      receiver: rec,
      auth: access_token,
    })
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    }
  }, [contain])
  



  function sendMessage() {
    if (contain !== "") {
      setMessage([...message, { contain: contain, self: true }]);
      setContain("");
      socket.emit("private", {
        contain: contain,
        receiver: rec,
        auth: access_token,
      });
    }
  }

  useEffect(() => {
    localStorage.setItem("message-"+ rec ,JSON.stringify(message))
    return () => {}
  }, [message])
  



  return (
    <div className="container">
      To : {usr}
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
              <div>{item.contain}</div>
              <br />
            </div>
          );
        }
      })}
      <br />

     {
      typing && (<small style={{color : "#a6a6a6"}}> Typing : {typing} </small>)
     }
      
     
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
