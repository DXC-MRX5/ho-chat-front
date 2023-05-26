import './App.css';
import io from "socket.io-client";
import {useEffect, useState} from "react"
import { BiSend } from "react-icons/bi";

const socket=io("https://ho-chat-server.onrender.com")

function App() {
  const [username, setUserName]=useState("")
  const [msg, setMsg]=useState("")
  const [messages, setMessages]=useState([])

  useEffect(()=>{
    socket.on("message",(data)=>{
      setMessages([...messages, data])
    })
  },[messages])
  const sendMessage=(e)=>{
    e.preventDefault();
    socket.emit("chat", {username,msg});
    setMsg("");
  }
  return (
    <div className="App">
    <h1>React Chat App</h1>
    <div className='chatWindow'>
    {messages.map((info, index)=>{
      return(
        <div className='chatBox'>
        {info.username === username ? (
          <div key={index} className='outgoing'>{info.msg}<span className='name'>You</span></div>
        ):(
          <div key={index} className='incoming'>{info.msg}<span className='name'>{info.username}</span></div>
        )
        }
      </div>
      )
    })}
    </div>
    <div className='typing'>
        <input type='text' placeholder='Enter Name' value={username} onChange={(e)=>{setUserName(e.target.value)}}/>
        <textarea type='text' placeholder='Type your message...' value={msg} onChange={(e)=>{setMsg(e.target.value)}} rows='2' cols='25'/>
        <button type='submit' onClick={sendMessage}><BiSend className='sendIcon'/></button>
    </div>
    </div>
  );
}

export default App;