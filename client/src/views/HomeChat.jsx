import React from 'react'
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';
const socket = io.connect("http://localhost:5000");

const HomeChat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if(username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  }
  return (

    <div>
      <h3>Join chat</h3>
      <input type="text"
        placeholder='Entrer your username:'
        onChange={(event) => setUsername(event.target.value)}
      /><br />
      <input type="text"
        placeholder='Room id:'
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom}>Join the room</button>
      <Chat  socket={socket} username={username} room={room}/>
    </div>

  )
}

export default HomeChat