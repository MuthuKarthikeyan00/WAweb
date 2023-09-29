
import React ,{useState,useEffect} from 'react';
import {Avatar,IconButton} from "@material-ui/core";
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import SearchIcon from '@material-ui/icons/Search';
import db from './firebase';
import "./SlideBar.css";
import SlideBarChat from './SlideBarChat';

import {useStateValue} from '../Context/StateProvider'



const SlideBar = () => {

      const [Groups, setGroups] = useState([]);
      const [{user},dispatch]=useStateValue();
      console.log(user)
        
      useEffect(() => {
        const unsubscribe= db.collection('groups').onSnapshot((snapshot)=>
        setGroups(
              snapshot.docs.map((doc)=>({
                  id:doc.id,
                  data:doc.data(),
              }))
          )
         );
         return ()=>{
          unsubscribe();
         }
    }, []);

     console.log(Groups);


    return (
        <div className="slideBar ">
            
            <div className="slideBar__header">
               <Avatar src={user.photoURL}/>
               <p>{user.displayName}</p>
               <div className="slideBar__headerRight">
                   <IconButton  className="">
                   <DataUsageIcon/> 
                   </IconButton>
                   <IconButton className="">
                   <MessageIcon/> 
                   </IconButton>
                   <IconButton className="">
                   <MoreVertIcon/> 
                   </IconButton>

        </div>
            </div>

            <div className="slideBar__search">
        <div  className="slidebar__searchContainer">
        <IconButton className="">
        <SearchIcon/>
        </IconButton>
             <input className="" placeholder="search your group"></input>
        </div>

        </div>
      
        <div className="slideBar__Chat">
           <SlideBarChat  addNewChat/>
          {Groups.map((groups)=>(
               <SlideBarChat key={groups.id}  data={groups.data} id={groups.id} />
          ))}
         
        </div>
        </div>
    )
}

export default SlideBar;
