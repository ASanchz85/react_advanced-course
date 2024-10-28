import { useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import { FaSearch } from 'react-icons/fa'
import { DEBOUNCE_DELAY } from '../../config/constants'
import './searchBar.css'

interface SearchBarProps {
  handleFilteredUsers: (query: string) => void
}

function SearchBar({ handleFilteredUsers }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query.trim(), DEBOUNCE_DELAY)

  useEffect(() => {
    handleFilteredUsers(debouncedQuery)
  }, [debouncedQuery])

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
