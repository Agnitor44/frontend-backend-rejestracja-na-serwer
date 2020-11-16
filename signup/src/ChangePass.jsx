import React, {createRef} from 'react'
import { NavLink, useHistory } from "react-router-dom";

export default function ChangePass() {
    const passOldRef = createRef()
    const passNewRef = createRef()
  const history = useHistory()
    const handleSub = (e) => {
        e.preventDefault()
        if(!passNewRef.current.value || !passOldRef.current.value) return alert('Uzupełnij pola')
      
        fetch('/api/registered'). then(data => data.json()).
        then(data => 
            {
            const id = data.findIndex(item => item.pass ===  passOldRef.current.value)
            if(id<0) return alert("błędne stare haśło")
                const obj = {
                    pass: passNewRef.current.value,
                    id: id

                }
                fetch('/passChange/hiddenRouteXD', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                  })
                  history.push('/login')
            })
            
    }

    return (
        <div className = 'all'>
        <div className = 'App'>
            <h1>Zmień Hasło</h1>
            <h3>Stare hasło</h3>
            <form onSubmit = {handleSub}>
            <input type = 'password' ref = {passOldRef} />
            <h3>Nowe hasło</h3>
            <input type = 'password' ref = {passNewRef} />
            <br/>
            <button>Zmień</button>
            </form>
        </div>
        </div>
    )
}
