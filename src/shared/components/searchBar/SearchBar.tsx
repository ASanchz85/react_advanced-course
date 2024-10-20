import { useState } from 'react'

function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <div className='search-bar__container'>
      <input
        type='text'
        placeholder='Type a message...'
        className='send__message__input'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
