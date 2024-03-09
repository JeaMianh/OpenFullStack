import React from 'react'

const PersonList = ({personsToShow}) => {
    return (
        <div>
            <h2>Numbers</h2>
            {personsToShow.map(person => <li key = {person.name}>{person.name} {person.number}</li>)}
            {/* {console.log(persons.map(person => <li key = {person.name}>{person.name}</li>) )} */}
        </div>
    )
}

export default PersonList