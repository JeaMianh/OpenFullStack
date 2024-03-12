import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import Display from './components/Display';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  // const [show, setShow] = useState([])
  
  

 useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the countries:', error);
    });
}, []);// 别忘了第二个参数[]

// useEffect(() => {
//   if (filter) {
//     const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
//     setShow(filteredCountries)
//   } else {
//     setShow("Enter a country name to search for.")
//   }
// }, [filter, countries])

console.log(countries)

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const show = countries.filter(country => country.name.common.toLowerCase().includes(filter))
  // 别把includes()方法名写错了。注意大小写敏感。
  // setShow(show)
  // console.log(show)

  return (
    <div>
      <h1>Countries List</h1>
      <Filter {...{filter, handleFilterChange}}/>
      <Display {...{show}} />
    </div>
  )
}

export default App;
