import React, { useState } from 'react';
import "./search.css"

function Search() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const data = [{"student":"yahya"},{"student":"ayoub"},{"student":"khalil"},{"student":"mootez"}];

  function searchStudent(event){
    const value = event.target.value;
    setSearch(value);

    const filteredData = data.filter(student => {
      return student["student"].toLowerCase().includes(value.toLowerCase());
    });
    setSearchResults(filteredData);
  }

  function handleResultClick(result) {
    setSearch(result["student"]);
    setSearchResults([]);
  }

  return (
    <>
    <div className='searchBar'>
      <form onSubmit={event => event.preventDefault()} role="search">
        <label htmlFor="search">Rechercher un étudiant</label>
        <input id="search" type="search" onChange={searchStudent} value={search} placeholder="Search..." autoComplete="off" />
        {searchResults.length > 0 && (
          <ul className='searchIcons'>
            {searchResults.map(result => (
              <li key={result["student"]} onClick={() => handleResultClick(result)}>
                {result["student"]}
              </li>
            ))}
          </ul>
        )}
        <button type="submit">Rechercher</button> 
      </form>
         
      </div>
    </>
  );
}

export default Search;
