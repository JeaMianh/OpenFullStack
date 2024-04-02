import React from 'react'
// import Button from '@mui/material/Button';

const Note = ({note, toggleImportance}) => {
    const label = note.important ? 'important' : 'unimportant'

    return (
        <div>
             <li className = 'note'>
                {note.content}
            </li>
            <button 
                // variant="contained" 
                // color="primary"
                onClick = {toggleImportance}
            >
                {label}
            </button>
        </div>
       
    )
}

export default Note