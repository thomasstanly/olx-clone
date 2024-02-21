import React,{useState,useContext,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';

export default function Signup() {
  const navigate = useNavigate()
  const [username,setUsername] = useState('')
  const [phone,setphone] = useState('')
  const [email,setEmail] = useState('')
  const [password,setpassword] = useState('')

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
    console.log(firebase)
    firebase.auth().createUserWithEmailAndPassword(email,password).then(result=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('user').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
          navigate('/login')
        }).catch((e)=>{console.log(e);})
      })
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            type="text"
            id="fname"
            name="name"
            onChange={(e)=>setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            type="email"
            id="email"
            name="email"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value={phone}
            type="number"
            id="lname"
            name="phone"
            onChange={(e)=>setphone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            type="password"
            id="password"
            name="password"
            onChange={(e)=>setpassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a  onClick={()=> navigate('/login')}>Login</a>
      </div>
    </div>
  );
}