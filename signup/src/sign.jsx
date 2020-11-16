import React, {useState, createRef, useEffect} from 'react'
import { NavLink, useHistory } from "react-router-dom";
import './App.css';
export default function Sign() {
    const emailRef = createRef()
    const passRef = createRef()
    const passAgainRef = createRef()
    const [zajety, setZajety] = useState(false)
    const history = useHistory()

 
     function handleSub(e)  {
        e.preventDefault()
       
        if(passAgainRef.current.value !== passRef.current.value) return alert("hasła są różne")
        if(!passAgainRef.current.value || !passRef.current.value || !emailRef.current.value) return alert("wypełnij każde pole")
        const obj = {
            email: emailRef.current.value,
            pass: passRef.current.value
        }
        fetch('/api/registered'). then(data => data.json())
        .then(data => {
            if(data.findIndex(item => item.email === emailRef.current.value) === -1) {
                fetch('/', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                  })
                  history.push('/login')
            } else return alert(' email zajęty')
        })
        setZajety(false)
        
    }
    return (
      
<div className = 'all'>
        <div className = 'App'>
    <form onSubmit = {handleSub}>
      <h2>Email</h2>
      <input ref = {emailRef}/>
      <h2>Hasło</h2>
      <input type = 'password' ref = {passRef}/>
      <h2>Powtórz Hasło</h2>
      <input type = 'password' ref = {passAgainRef}/>
      <br/>
      <button>Zarejestruj</button>
    </form>
    <NavLink to = '/login'>Masz już konto?</NavLink>
        </div>
        </div>
       
    )
}
