import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import AddPersonForm from "./components/AddPersonForm";
import PersonList from "./components/PersonList";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const personsToShow = persons.filter(person => person.name.includes(searchName))

  // 从服务器获取数据
  useEffect(() => {
    console.log('effect');
    personService
      .getAll()
      .then(initData => {
        setPersons(initData)
      })
  }, [])

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

    // 是否重复
    const isDulicate = (name, number) => {
      return persons.some(person => person.name === name) && persons.some(person => person.number === number)
    } 
    // 如果重复，弹出警告
    if (isDulicate(newName, newNumber)) {
      alert(`${newName} or ${newNumber} is already added to phonebook.`)
      return
    }

    // const updateNumber = (newName, newNumber) => {
      // some方法返回一个布尔值
      // 姓名相同，但是号码不同，询问是否需要更新
      const person = persons.find(person => person.name === newName)
      if (person) {
        const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if (confirmUpdate) {
          const updatePerson = {...person, number: newNumber}
           personService
            .updateNumber(person.id, updatePerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              console.error('Update failed', error)
            })
        }else{
          console.log('Update action cancelled')
        }
        return
      }
    
      // 添加新的联系人
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
  
    // 删除联系人
  const deletePerson = (id, name) => {
    // const url = `http://localhost:3001/persons/${id}`
    // const person = persons.find(p => p.id === id)
    if (window.confirm(`Do you really want to detele ${name}?`)) {
      personService
        .deleteP(id)
        .then(() => {
           setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Delete failed', error)
        })
    }else{
      console.log('Delete action cancelled');
    }
      // window.open("exit.html", "Thanks for Visiting!");
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
