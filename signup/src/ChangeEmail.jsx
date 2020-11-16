import React, {createRef} from 'react'
import { NavLink, useHistory } from "react-router-dom";
import {useUser} from './App'
export default function ChangeEmail() {
    const {user, setUser} = useUser()
    const emailRef = createRef()
    const history = useHistory()
    const handleSub = (e) => {
        e.preventDefault()
        fetch('/api/registered'). then(data => data.json()).
        then(data => {
            const id = data.findIndex(item => item.email === user.email)
            if(emailRef.current.value === user.email) return alert('to jest ten sam email')
           const obj = {
               email: emailRef.current.value,
               id: id
           }
           
            fetch('/ChangeEmail/hiddenRouteXD',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }
            )
            setUser({...user, email: emailRef.current.value})
            history.push('/login')
        })
    }
    return (
        <div className = 'all'>
        <div className = 'App'>
            <form onSubmit = {handleSub}>
            <h2>Nowy Email</h2>
            <input ref = {emailRef} />
            <br/>
            <button>Zmień</button>
            </form>
        </div>
        </div>
    )
}
