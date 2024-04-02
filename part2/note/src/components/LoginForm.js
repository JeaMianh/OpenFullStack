import React from "react"
import { useState, useEffect } from 'react'
import loginService from '../services/login'
import noteService from '../services/note'

const LoginForm = () => { 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])



    const handleUsername = ({ target }) => {
        setUsername(target.value)
    }
    const handlePassword = ({ target }) => {
        setPassword(target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const user = await loginService.login({ username, password })
            // console.log('first:', user.token)
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
        )
        // console.log('second:', user.Token)
        noteService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
        } catch (exception) {
        // setErrorMessage('Wrong credentials')
        // setTimeout(() => {
        //   setErrorMessage(null)
        // }, 5000)
        }
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