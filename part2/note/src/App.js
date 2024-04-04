import { useState, useEffect, useRef } from 'react'

import Togglabel from './components/Togglable'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import NoteList from './components/NoteList'

import noteService from './services/note'
import loginService from './services/login'

const App = () => { 
  const [notesList, setNoteList] = useState([])
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()
  // 从组件外部访问组件的函数，创建一个参考 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialNotes = await noteService.getAll();
          setNoteList(initialNotes);
      } catch (error) {
          console.error("Error fetching notes:", error);
      }
    }  
    fetchData()
  }, []);
  // 空数组作为依赖项, 只在首次渲染时执行

 useEffect(() => {
        const loggerUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggerUserJSON) {
            const user = JSON.parse(loggerUserJSON)
            setUser(user)
            // console.log(user)
            noteService.setToken(user.token)
            console.log('Store successfully!')
        }
  }, [])

  const handleLogin = async (username, password, ) => {
      console.log('logging in with', username, password)
      try {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
        )
        noteService.setToken(user.token)
        setUser(user)
      } catch (exception) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      }
    }

  const handleLogout = () => {
    console.log('log out successfully')
    setUser(null)
  }
  

  const addNote = async (noteObject) => {
      noteFormRef.current.toggleVisibilty()
      noteService
      .create(noteObject)
      .then(returnedNote => {
        setNoteList(notesList.concat(returnedNote))
      
      })
  }

  const toggleImportanceOf = (id) => {
    id = id.toString()
    // const url = `http://172.207.33.197:3001/${id}`
    // console.log('url', url)
    const note = notesList.find(n => n.id === id)
    // console.log('note', note)
    const changenote = {...note, important : !note.important}
    // console.log('changenote', changenote)

    noteService
    .update(id, changenote)
    .then(returnedNote => {
        setNoteList(notesList.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
        console.error(error)
        alert(
        `The note '${note.content}' was already deleted from server`
        )
        setNoteList(notesList.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>

        {user === null 
          ?
            <Togglabel buttonLabel='log in'>
              <LoginForm
                userLogin={handleLogin}  
              />
            </Togglabel>
          :
            <div>
              <p>
                {user.name} logged-in
                <button onClick={handleLogout}>log out</button>
              </p>
              <Togglabel buttonLabel='new note' ref={noteFormRef}>
                <NoteForm
                  createNote={addNote}
                />
              </Togglabel>
            </div>
        }

      <NoteList
        notesList={notesList}
        toggleImportanceOf={toggleImportanceOf}
      />

    </div>
  )
}

export default App
