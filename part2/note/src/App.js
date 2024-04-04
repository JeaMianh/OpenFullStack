import { useState, useEffect } from 'react'

import Togglabel from './components/Togglable'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
// import Note from './components/Note'
import noteService from './services/note'
import NoteList from './components/NoteList'
import loginService from './services/login'
// import Notification from './components/Notification'

const App = () => { 
  const [notesList, setNoteList] = useState([])
const [user, setUser] = useState(null)
const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
  // useEffect(async () => {
  //   const initialNotes = await noteService.getAll()
  //   console.log(initialNotes)
  //   setNoteList(initialNotes)
  // }, [])
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
            console.log(user)
            noteService.setToken(user.token)
            console.log('Store successfully!')
        }
    }, [])

const handleLogin = async (username, password) => {
        // event.preventDefault()
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
          // setUsername('')
          // setPassword('')
      } catch (exception) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      }
    }

  const addNote = async (noteObject) => {
      noteService
      .create(noteObject)
      .then(returnedNote => {
        setNoteList(notesList.concat(returnedNote))
      
      })
  }

  const toggleImportanceOf = (id) => {
    id = id.toString()
    const url = `http://172.207.33.197:3001/${id}`
    console.log('url', url)
    const note = notesList.find(n => n.id === id)
    console.log('note', note)
    const changenote = {...note, important : !note.important}
    console.log('changenote', changenote)

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
//  const handleLogin = async (event) => {
    
//   }
  return (
    <div>
      <h1>Notes</h1>

        {user === null 
          ?
            <Togglabel buttonLabel='log in'>
              <LoginForm
                userLogin={handleLogin}  
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
              />
            </Togglabel>
          :
            <div>
              <p>{user.name} logged-in</p>
              <Togglabel buttonLabel='new note'>
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

     {/* <Button type = "submit">save</Button> */}
    </div>
  )
}

export default App
