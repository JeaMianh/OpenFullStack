import React from "react";
import Note from "./Note";
import { useState, useEffect } from "react";
import noteService from '../services/note'

const NoteList = () => {
     const [notesList, setNoteList] = useState([])
    // console.log(notesList)
    const [showAll, setShowAll] = useState(true)


    useEffect(() => {
        noteService
        .getAll()
        .then(initialNotes=> {
            setNoteList(initialNotes)
        })
    }, [])
  // 空数组作为依赖项, 只在首次渲染时执行

    const notesToShow = showAll ? notesList : notesList.filter(note => note.important)
 
    const toggleImportanceOf = (id) => {
        id = id.tostring()
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

    return (
       <div>
            <div>
                <button onClick = {() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>

            <ul>
                {notesToShow.map((note) => 
                <Note 
                    key = {note.id}
                    note = {note}
                    toggleImportance = {() => toggleImportanceOf(note.id)} 
                />
                )}
            </ul>
        </div>
    )
}

export default NoteList