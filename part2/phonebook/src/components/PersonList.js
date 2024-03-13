import React from 'react'

const PersonList = ({personsToShow, deletePerson}) => {
    return (
        <div>
            <h2>Numbers</h2>
            {personsToShow.map(person => <li key = {person.name}>{person.name} {person.number}</li>)}
            {/* {console.log(persons.map(person => <li key = {person.name}>{person.name}</li>) )} */}
            <button onClick={deletePerson}>Delete</button>
        </div>
    )
}

export default PersonList