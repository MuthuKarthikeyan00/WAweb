import { Avatar } from '@material-ui/core';
import React ,{useState,useEffect} from 'react';
import "./SlideBarChat.css";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import db from './firebase';
import {Link} from 'react-router-dom';

const SlideBarChat = ({data,id,addNewChat}) => {
      console.log(data)
    const [AddGroupName, setAddGroupName] = useState("");
    const [message, setMessages] = useState('');
    console.log(message);
    console.log("id");
    let idid='IxNnkslzDCpFuSpNqgOq';
    useEffect(() => {
      if(id){
        db.collection("groups").doc(id).collection('messages').orderBy('timestamp',"asc").onSnapshot((Snapshot) => setMessages(Snapshot.docs.map((doc) => doc.data() ))
        );
      }
   
    }, [id])
   
    const newGroup=()=>{
        setAddGroupName(prompt("Enter your GroupName"))
    }
    
    useEffect(() => {
        if(AddGroupName){
             db.collection('groups').add({
                 name:AddGroupName,
             });
             
        }
    }, [AddGroupName])


    return  !addNewChat ?(

        <Link to={`/group/${id}`}>
                <div className="SlideBarChat ">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`}></Avatar>
                    <div className='SlideBarChat__info '>
                        <h3>{data.name}</h3>
                        <p>{message[message.length-1]?.message}</p>
                    </div>
                </div>   
        </Link>
        ):(

            <div className="slideBar__AddGroup " onClick={newGroup}>
            <GroupAddIcon className="" /> Create New Group
            </div>
                  
        );
      
            
}

export default SlideBarChat;