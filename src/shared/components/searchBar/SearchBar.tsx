import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import './searchBar.css'

function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <div className='search-bar__container'>
      <input
        type='text'
        placeholder='Search...'
        className='search-input'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <FaSearch className='search-icon' />
    </div>
  )
}

export default SearchBar
