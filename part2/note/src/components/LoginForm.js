import React from "react"
import { useState } from 'react'

const LoginForm = ({ userLogin }) => { 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleUsername = ({ target }) => {
        setUsername(target.value)
    }
    const handlePassword = ({ target }) => {
        setPassword(target.value)
    }

    const handleLogin = (event) => {
        event.preventDefault()
        
        userLogin(username, password)
        
        // setUser(user)
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={handleUsername}
                />
            </div>
            <div>
                password
                <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={handlePassword}
                />
            </div>
            <button type='submit'>login</button>
            </form>
    
        </div>
    )
}

export default LoginForm  