import SlideBar from './components/SlideBar';
import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import {useStateValue} from './Context/StateProvider';
import {useState} from 'react';

function App() {
     
     const [{user},dispatch]=useStateValue();
     const [themes, settheme] = useState(true)
     console.log(themes);

     const changeTheme=()=>{
         const app =document.getElementById('app');
         settheme(!themes);
         if(themes){
          app.classList.remove('bgB');
          app.classList.add('bgw');
    
       
         }else{
          app.classList.remove('bgw');
          app.classList.add('bgB');
         }
     }

  return !user?(
            <Login></Login>
    ):(
      <div id='app' className="app ">
         
      <div className="app__container">
      <button className='btnA' onClick={changeTheme}>click</button>
        <Router>
        <SlideBar/>
          <Switch>
             
              <Route path='/group/:groupId'>
             <Chat></Chat>
              </Route>
              <Route path="/">
             <Chat></Chat>
              </Route>
          </Switch>
        </Router>
      </div>
 </div>
    );
  
}


export default App;

