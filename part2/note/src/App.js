import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = () => {
  // const result = notes.map((note, i) => note.content)
  // console.log(result)
  const [notesList, setNoteList] = useState([])
  // console.log(noteList)
  const [newNote, setNewNote] = useState('A new note')
  const [showAll, setShowAll] = useState(true)

 
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNoteList(response.data)
    })
  }
  useEffect(hook, [])

  console.log('render', notesList.length, 'notes')

  const notesToShow = showAll ? notesList : notesList.filter(note => note.important)

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  // 提交时调用
  const addNote = (event) => {
    // 阻止提交默认表单 
    event.preventDefault()
    console.log('button clicked', event.target);
    const noteObject = {
      content : newNote,
      date : new Date().toISOString(),
      important : Math.random() < 0.5,
      id : notesList.length + 1,
    }

    setNoteList(notesList.concat(noteObject))
    setNewNote('')
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick = {() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => 
          <Note key = {note.id} note = {note} />
        )}
        {/* map() 按照参数的映射规则，创造一个新的React数组 */}
      </ul>
      
{/* <form onSubmit={addNote}>: 这是一个表单元素，当用户提交表单时，会触发addNote函数。这个函数可能用于处理用户输入的新笔记并将其保存。
<input value={newNote} onChange={handleNoteChange}>: 这是一个输入框，用户可以在其中输入笔记内容。value={newNote}表示输入框的值由newNote变量控制。onChange={handleNoteChange}是一个事件处理器，当输入框的内容发生变化时，会调用handleNoteChange函数，这个函数可能用于更新newNote变量的值。
<button type="submit">save</button>: 这是一个按钮，用户点击后会提交表单。type="submit"指定了按钮的类型为提交按钮。 */}
      <form onSubmit={addNote}>
        <input 
          value = {newNote} 
          onChange = {handleNoteChange}
          />
        <button type = "submit">save</button>
      </form>

    </div>
  )
}

export default App
