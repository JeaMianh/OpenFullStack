import React from 'react'

const Header = ({name}) => {
    return (
        <h1>{name}</h1>
    )
}
const Part = ({parts}) => {
    return (
        parts.map(part => <p key = {part.id}> {part.name} {part.exercises} </p>)
    )
}
const Total = ({parts}) => {
    const total = parts.reduce((sum, parts) => sum + parts.exercises, 0)
    return (
        <p> Total of {total} exercises.</p>
    )
}
const Content = ({parts}) => {
    return (
        <div>
            <Part parts={parts}/>
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name = {course.name}/>
            <Content parts = {course.parts}/>
            <Total parts = {course.parts}/>
        </div>
        
    )
}

export default Course