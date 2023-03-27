import React, { useState } from 'react';
import "./search.css"
import "./Analytics"
import Analytics from './Analytics';


function Search() {
  const [search, setSearch] = useState("");
  const [student,setStudent] = useState()
  const [searchResults, setSearchResults] = useState([]);

  const data = [{"student":"yahya","absenceHours":{"lundi":2,"mardi":1,"mercredi":0,"jeudi":3,"vendredi":4}},{"student":"ayoub","absenceHours":{"lundi":2,"mardi":1,"mercredi":0,"jeudi":3,"vendredi":4}},{"student":"khalil","absenceHours":{"lundi":2,"mardi":1,"mercredi":0,"jeudi":3,"vendredi":4}},{"student":"mootez","absenceHours":{"lundi":2,"mardi":1,"mercredi":0,"jeudi":3,"vendredi":4}}];

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
    setStudent(result)
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
      {student ? (
        <div>
        <h1>Absence Chart</h1>
        <Analytics data={student} />
      </div>
      ) : null}
      </div>
    </>
  );
}

export default Search;
