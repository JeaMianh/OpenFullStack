import React from 'react'

const SearchForm = ({searchName, handleSearchName}) => {
    return (
        <form >
          Search By Name: 
          <input 
            placeholder = "张三"
            value = {searchName}
            onChange = {handleSearchName}
          />
        </form>
    )
}

export default SearchForm
