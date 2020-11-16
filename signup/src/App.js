import React, {useState, createContext, useContext} from 'react'
import './App.css';
import Sign from './sign'
import Login from './Login'
import ChangeEmail from './ChangeEmail'
import ChangePass from './ChangePass'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

const User = createContext()
export const useUser = () => {
  return useContext(User)
}

function App() {
  const [user, setUser] = useState('') 
  const value = {
    user:user,
    setUser: setUser
  }
  return (
    <User.Provider value = {value}>
    <Router>
      <Route exact path = '/' component = {Sign}/>
      <Route path = '/login' component = {Login}/>
      <Route path = '/changePass' component = {ChangePass} />
      <Route path = '/changeEmail' component = {ChangeEmail} />
    </Router>
    </User.Provider>
  );
}

export default App;
//ddd