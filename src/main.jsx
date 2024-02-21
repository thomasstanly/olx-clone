import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {FirebaseContext} from './store/Context.jsx'
import Context from './store/Context.jsx'
import firebase from './firebase/config.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <FirebaseContext.Provider value={{firebase}}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>,
)
