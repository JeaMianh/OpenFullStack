import React from "react"
// import { useState, useEffect } from 'react'
// import loginService from '../services/login'
// import noteService from '../services/note'

const LoginForm = ({ userLogin, username, password, setUsername, setPassword }) => { 
    
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
    //     try {
    //       const user = await loginService.login({ username, password })
    //       console.log('first:', user.token)
    //       window.localStorage.setItem(
    //           'loggedNoteappUser', JSON.stringify(user)
    //       )
    //       // console.log('second:', user.Token)
    //       noteService.setToken(user.token)
          
    //   } catch (exception) {
    //   // setErrorMessage('Wrong credentials')
    //   // setTimeout(() => {
    //   //   setErrorMessage(null)
    //   // }, 5000)
    //   }
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