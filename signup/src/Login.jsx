import React, {createRef, useState} from 'react'
import { BrowserRouter, NavLink, useHistory } from "react-router-dom";
import {useUser} from './App'
export default function Login() {
    const emailRef = createRef()
    const passRef = createRef()
    const {user, setUser} = useUser()
    const handleSub = (e) => {
        e.preventDefault()
        fetch('/api/registered').
        then(data => data.json()).
        then(data => {
            const id = data.findIndex(item => item.email === emailRef.current.value)
            if(id<0) return alert('email nie istnieje')
            if(passRef.current.value !== data[id].pass) return alert('błędne hasło')
            
            setUser(data[id])
            
            

           
        })
    }
    const deleteAccount = () => {
        const mail = {
            email: user.email
        }

        fetch('/api/delete', {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json'},
            body: JSON.stringify(mail)
        })
        setUser('')
    }
    return (
        user
        ?
        <div className = 'all'>
        <div className = "App">
            <h1>{user.email}</h1>
            <button onClick = {() => setUser('')}>Wyloguj</button>
            <br/>
            <NavLink to = '/ChangeEmail'>Zmień email</NavLink>
            <br/>
            <NavLink to = '/ChangePass'>Zmień hasło</NavLink>
            <br/>
            <button onClick = {deleteAccount}>Usuń konto</button>
        </div>
        </div>
        :
        <div className = 'all'>
        <div className = "App">
            <form onSubmit = {handleSub}>
            <h2>Email</h2>
            <input  ref = {emailRef} />
            <h2>Hasło</h2>
            <input  type = 'password' ref = {passRef}/>
            <br/>
                <button>Zaloguj</button>
                <br/>
                <NavLink to = '/'>Nie masz konta?</NavLink>
            </form>
            </div>
        </div>
     
        
    )
}
