import React, { useEffect, useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
//import "../components/chat/chat.css";

const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    const leaveRoom = async () => {
        if (room !== "") {
            console.log(`${username} left the room`);
            await socket.emit("leave_room", room);

        }
    }

    useEffect(() => {
        socket.off().on("receive_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data])
        });
    }, [socket])

    return (
        <>
            <div className="title"><h3>Chat Live</h3></div>
            <div className='chat'>
                <div className="rooms">
                    {messageList.map((messageContent) =>{
                        if(room !== "") {
                            return (
                                <div className="room">
                                    <p>{messageContent.room}</p>
                                </div>
                            )
                        }
                        return null;
                    })}
                </div>
                <div className="chat-header">
                </div>
                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                        {messageList.map((messageContent) => {
                            if (messageContent.room === room) {
                                return (
                                    <div
                                        className="message"
                                        id={username === messageContent.author ? "you" : "other"}
                                    >
                                        <div>
                                            <div className="message-content">
                                                <p>{messageContent.message}</p>
                                            </div>
                                            <div className="message-about">
                                                <p id="time">{messageContent.time}</p>
                                                <p id="author">{messageContent.author}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </ScrollToBottom>
                </div>
                <div className="chat-footer">
                    <input
                        type="text"
                        value={currentMessage}
                        placeholder='Write your message...'
                        onChange={(event) => setCurrentMessage(event.target.value)}
                        onKeyDown={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                    />
                    <button className='send' onClick={sendMessage}>&#9658;</button>
                    <button className='leaveRoom' onClick={leaveRoom}>Leave the room</button>
                </div>
            </div></>
    )
}

export default Chat;