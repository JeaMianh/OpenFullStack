import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // 读取输入
  const handleAddName = (e) => {
    setNewName(e.target.value)
  }
  const handleAddNumber = (e) => {
    setNewNumber(e.target.value)
  }

  // 真正的提交逻辑
  const addName = (e) => {
    e.preventDefault()
    // const personObject = { // 创建一个新的对象, 而不是原来对象的展开
    //   ...persons,
    //   name: newName
    // }
    const nameObject = {
      name: newName,
      number: '',
      id: persons.length + 1
    }
    // if (persons.includes({nameObject.name})) { // includes() 不能判断对象中的属性
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }
  const addNumber = (e) => {
    e.preventDefault()
    // const personObject = { // 同上
    //   ...persons,
    //   number : newNumber
    // }
     const numberObject = {
      name: '',
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(numberObject))
    setNewNumber('')
  }
  const handleSubmit = (e) => {
    addName(e)
    addNumber(e)
  }

  return (
    <div>
      <h1>PhoneBook</h1>
      <form onSubmit = {handleSubmit}>
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
      <h2>Numbers</h2>
        {persons.map(person => <li key = {person.name}>{person.name} {person.number}</li>)}
        {console.log(persons.map(person => <li key = {person.name}>{person.name}</li>) )}
    </div>
  )
}

export default App;
