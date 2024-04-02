import { useState, useEffect } from 'react'

import Togglabel from './components/Togglable'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import Note from './components/Note'
import noteService from './services/note'
import NoteList from './components/NoteList'
// import loginService from './services/login'
// import Notification from './components/Notification'

const App = () => {
  // 提交时调用

  return (
    <div>
      <h1>Notes</h1>

       <Togglabel buttonLabel='log in'>
        <LoginForm/>
       </Togglabel>
      
       <Togglabel buttonLabel='new note'>
        <NoteForm/>
       </Togglabel>

      <NoteList/>

     {/* <Button type = "submit">save</Button> */}
    </div>
  )
}

export default App
