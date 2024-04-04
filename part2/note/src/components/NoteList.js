import React from "react";
import Note from "./Note";
import { useState, useEffect } from "react";
import noteService from '../services/note'

const NoteList = ({ notesList, toggleImportanceOf }) => {
    
    // console.log(notesList)
    const [showAll, setShowAll] = useState(true)

    // console.log(notesList)

    const notesToShow = showAll ? notesList : notesList.filter(note => note.important)
 

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