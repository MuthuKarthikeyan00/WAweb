import React,{useEffect,useState} from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import { FormControl, Input } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import MicNoneIcon from '@material-ui/icons/MicNone';
import MoodIcon from '@material-ui/icons/Mood';
import './Chat.css';
import {useParams} from 'react-router-dom';
import db from './firebase';
import {useStateValue} from '../Context/StateProvider';
import firebase from 'firebase';


const Chat = () => {
      

    const arrColor=["#eb660d","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8","#eb2e0d","#eb0d96","#5c8f5a","#4092b8"];

        const [GroupName, setGroupName] = useState('');
        const [{user},dispatch]=useStateValue();
        const [Messages, setMessages] = useState([]);
        const [sendmessage, setsendMessage] = useState("");
        const {groupId}=useParams();
        console.log(sendmessage);
        console.log(Messages);

        useEffect(() => {
          if(groupId){

            db.collection('groups').doc(groupId).onSnapshot((snapshot)=>(
                setGroupName(snapshot.data().name)
            ))

            db.collection("groups").doc(groupId).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot)=>{
                setMessages(snapshot.docs.map((doc)=>
                        doc.data(),
                ))
            })

          }
        }, [groupId])


        const HandleValue =(e)=>{
            setsendMessage(e.target.value)
        }
        const sendMessage =(e)=>{
            e.preventDefault();
            db.collection("groups").doc(groupId).collection("messages").add({
                name:user.displayName,
                message:sendmessage,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),

            })
            setsendMessage("")
      }


    return (
        <div className="Chat">
            <div className="Chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`}></Avatar>
               <div className="Chat__headerInfo ">
               <h4>{GroupName}</h4>
                <p>Last seen{" "}
                        {new Date(Messages[Messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
               </div>
                <div className="Chat__headerRight">
                    <IconButton className="">
                        <SearchIcon />
                    </IconButton>
                    <IconButton className="">
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton className="">
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>

            <div className="Chat__body">

            {Messages.map((messages,index)=>(
                 
                 <p key={index} className={`Chat__message ${messages.name==user.displayName && 'Chat__reciver'}`}>
                 <span style={{color:arrColor[index]}} className="Chat__name">{messages.name}</span>
              
                 {messages.message}
                 <span className="Chat__timestamp">{new Date(messages.timestamp?.toDate()).toUTCString()}</span>
             </p>
                
            ))}



            </div>

            <div className="Chat__footer">
                <form className="Chat__footerForm">
                    <IconButton className="Chat__footerFormButton " variant="container" color="primary">
                        <MoodIcon />
                    </IconButton>
                    <input value={sendmessage} onChange={HandleValue} className="Chat__footerFormInput " placeholder="Type a message">
                    </input>

                     
                        <button disabled={!sendmessage} className="Chat__footerFormBtn" onClick={sendMessage} >
                        send
                    </button>
               

                   
                    <IconButton className="Chat__footerFormButton " variant="container" color="primary">
                        <MicNoneIcon />
                    </IconButton>
                </form>



            </div>

        </div>
    )
}
export default Chat;
