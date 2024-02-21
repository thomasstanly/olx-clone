import React,{useState,useContext, useEffect} from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import {useNavigate} from 'react-router-dom'
import { FirebaseContext } from '../../store/Context';

function Login() {
  const [email,setEmail]  = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const {firebase} = useContext(FirebaseContext)

  useEffect(()=>{
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigate('/')
      }
    })
    return () => unsubscribe()
  },[])

  const handleSubmit = (e)=>{
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {  
      navigate('/')
    }).catch((error)=>{
      alert(error.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            type="email"
            id="fname"
            name="email"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            type="password"
            id="lname"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a  onClick={()=> navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;