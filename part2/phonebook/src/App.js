import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import AddPersonForm from "./components/AddPersonForm";
import PersonList from "./components/PersonList";
import personService from "./services/person";
import person from "./services/person";
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  
  useEffect(() => {
    console.log('effect');
    personService
      .getAll()
      .then(initData => {
        setPersons(initData)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.includes(searchName))

  // 读取输入
  const handleAddName = (e) => {
    setNewName(e.target.value)
  }
  const handleAddNumber = (e) => {
    setNewNumber(e.target.value)
  }
  const handleSearchName = (e) => {
    setSearchName(e.target.value)
  }

  // 真正的提交逻辑
  const addPerson = (e) => {
    e.preventDefault()
    // const personObject = { // 创建一个新的对象, 而不是原来对象的展开
    //   ...persons,
    //   name: newName
    // }
    const personObject = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1
    }

    const isDulicate = (name, number) => {
      return persons.some(person => person.name === name) || persons.some(person => person.number === number)
    } // person 是一个代表数组 persons 中当前正在处理的元素的变量。
    // if (persons.includes({nameObject.name})) { // includes() 不能判断对象中的属性
    
    if (isDulicate(newName, newNumber)) {
      alert(`${newName} or ${newNumber} is already added to phonebool.`)
      return
    }
    
    personService
      .create(personObject)
      .then(returnedData => {
        setPersons(persons.concat(returnedData))
        setNewName('')
        setNewNumber('') 
        console.log('return:', returnedData)
      })
      .catch(error  => {
        console.error('Error:', error)
      })
      console.log(persons)

    
     
  }

  const deletePerson = (id) => {


  }

  return (
    <div>
      <h1>PhoneBook</h1>
      {/* <SearchForm searchName = {searchName} handleSearchName = {handleSearchName} /> */}
      <SearchForm {...{searchName, handleSearchName}} />
      <AddPersonForm {...{newName, newNumber, handleAddName, handleAddNumber, addPerson}} />
      <PersonList {...{personsToShow, deletePerson}}/>
    </div>
  )
}

export default App;
