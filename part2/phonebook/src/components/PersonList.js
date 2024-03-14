import React from 'react'

const PersonList = ({personsToShow, deletePerson}) => {
    return (
        <div>
            <h2>Numbers</h2>
            {personsToShow.map(person =>(
                // key 属性只需用在列表的直接子元素上使用
                    <ul key={person.id}>   
                        <li>{person.name} {person.number}</li>
                        {/* <button onClick = {deletePerson(person.id)}>Delete</button> */}
                        {/* 这种写法会导致页面渲染时立即调用函数 */}
                        <button onClick = {() => deletePerson(person.id, person.name)}>Delete</button>
                    </ul> ))}
            
            {/* {console.log(persons.map(person => <li key = {person.name}>{person.name}</li>) )} */} 
        </div>
    )
}

export default PersonList