import React from 'react'
import Button from '@mui/material/Button';

const Note = ({note, toggleImportance}) => {
    const label = note.important ? 'important' : 'unimportant'

    return (
        <div>
             <li className = 'note'>
                {note.content}
            </li>
            <Button 
                // variant="contained" 
                // color="primary"
                onClick = {toggleImportance}
            >
                {label}
            </Button>
        </div>
       
    )
}

export default Note