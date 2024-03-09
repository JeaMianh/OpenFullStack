import React from 'react'

const AddPersonForm = ({newName, newNumber, handleAddName, handleAddNumber, addPerson}) => {
    return (
        <div>
            <h2>Add a New</h2>
            <form onSubmit = {addPerson}>
                <input
                    placeholder = 'name'
                    value = {newName}
                    onChange = {handleAddName}
                 // onChange = {(e) => setNewName(e.target.value)}
                />
                <br/>
                <input
                    placeholder = 'number'
                    value = {newNumber}
                    onChange = {handleAddNumber}
                />
                <button type = 'submit'>add</button>
            </form>
        </div>
    )
}

export default AddPersonForm