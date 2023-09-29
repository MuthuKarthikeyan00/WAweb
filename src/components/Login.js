import React from 'react';
import './Login.css';
import logo from '../img/w2.png';
import logo2 from '../img/google.png';
import {auth,provider} from "./firebase";
import {useStateValue} from "../Context/StateProvider";
import { action } from '../Context/reducer';

const Login = () => {

       const [{user},dispatch]=useStateValue();
       console.log(user);

    const Clk=()=>{
        const mk= document.getElementById('log');
        mk.classList.add('bgb');
       auth.signInWithPopup(provider).then((result)=>{
        dispatch({
              type:action.actionType,
              user:result.user,
        })
       })

      
      }
    return (
        <div id='log' className="Login">
      <div className="Login__container">
     <div className="Login__container2">
     <img src={logo} alt='logo'></img>
      <h2>SIGN IN WITH GOOGLE<br></br> ACCOUNT</h2>
     <div  onClick={Clk} className="Login__containerGOOGLE"> 
     <img src={logo2} alt="clickme"></img>`click It
     </div>
     </div>
      </div>
            
        </div>
    )
}

export default Login
