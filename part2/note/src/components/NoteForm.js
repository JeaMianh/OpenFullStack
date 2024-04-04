import React from "react"
import { useState } from 'react'

const NoteForm = ({ createNote }) => {
	
  const [newNote, setNewNote] = useState('A new note')
 
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    // 阻止提交默认表单 
    event.preventDefault()
    console.log('button clicked', event.target);
    createNote({
      content : newNote,
      date : new Date().toISOString(),
      important : false,
    })
    setNewNote('')
  }

  return (
	<div>
		<h2>Create a new note</h2>

		<form onSubmit={addNote}>
			<input
				value={newNote}
				onChange={handleNoteChange}
			/>
			<button type='submit'>save</button>
		</form>
	</div>
	)
}

export default NoteForm