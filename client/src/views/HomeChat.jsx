import React from 'react'
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';
import "../components/chat/chat.css";
const socket = io.connect("http://localhost:5000");

const HomeChat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  

  const joinRoom = async () => {
    if (username !== "" && room !== "") {
      const messageData = {
        room: room,
        author: `Bot`,
        message: `${username} joined the room ${room}`,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      
      await socket.emit("join_room", messageData);
      //setRoom((list) => [...list, messageData]);
         
    }
  }
  return (

    <div>
      <h3>Join chat</h3>
      <input 
        type="text"
        class="form-control"
        id="floatingInput"
        placeholder='Entrer your username:'
        onChange={(event) => setUsername(event.target.value)}
      /><br />
      <input 
        type="text"
        class="form-control"
        id="floatingInput"
        placeholder='Room id:'
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom}>Join the room</button>
      <Chat socket={socket} username={username} room={room} />
    </div>

  )
}

export default HomeChat