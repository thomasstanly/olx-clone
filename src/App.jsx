import React, { useContext, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {AuthContext, FirebaseContext} from './store/Context';
import Post from './store/PostContext'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import './App.css';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  })
  return (
    <div>
       <Post>
          <Router>
            <Routes>
              <Route path='/' element={<Home />}/> 
              <Route path='/signup' element={<Signup />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/create' element={<Create />}/>
              <Route path='/create' element={<Create />}/>
              <Route path='/post' element={<ViewPost />}/>

            </Routes>
          </Router>
       </Post>
    </div>
  );
}

export default App;