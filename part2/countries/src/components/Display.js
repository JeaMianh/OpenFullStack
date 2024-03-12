import React from "react";

const Display = ({show}) => {
    // if (typeof show === 'string') {
    //     return <p>{show}</p>
    // }
    if (show.length > 10) {
        return <p>Too many matches, specify another filter.</p>
    }
    return (
        <div>
            {show.map((country,index) => {
                return (
                    <div key = {index}>
                        <h1>{country.name.common}</h1>
                        <p>Capital: {country.capital}</p>
                        <p>Population: {country.population}</p>
                        <p>Area: {country.area}</p>
                        <h2>Languages:</h2>
                        <ul>
                            {/* 将对象转换为数组 */}
                            {Object.values(country.languages).map((lang,i) => 
                                <li key = {i}>{lang}</li>)
                            }
                        </ul>
                        <hr/>
                    </div>
            )})}
        </div>
    )
}

export default Display;