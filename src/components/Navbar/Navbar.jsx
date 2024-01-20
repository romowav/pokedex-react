import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSearchContext } from '../../hooks/useSearchContext'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const urlBase = 'https://pokeapi.co/api/v2/pokemon/'
  const { setPokeSearch } = useSearchContext()
  const [pokeState, setPokeState] = useState('')
  const [search, setSearch] = useState('')

  const searchData = async (data) => {
    console.log('after calling searchData -', data)
    const pokeName = data.trim()
    const nameLowC = pokeName.toLowerCase()
    const urlAPI = urlBase + nameLowC
    console.log('after urlAPI const -', urlAPI)
    try {
      const response = await axios.get(urlAPI)
      console.log('try response -', response.data)
      setPokeState(response.data)
      console.log('pokeState -', pokeState)
      setPokeSearch(pokeState)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    // Este bloque de código se ejecutará cada vez que pokeState se actualice
    setPokeSearch(pokeState)
    // console.log('useEffect log -', pokeSearch)
  }, [pokeState, setPokeSearch])

  const handleChange = (value) => {
    setSearch(value)
  }

  const handleKeyDown = () => {
    searchData(search)
    document.getElementById('busqueda').click()
  }

  return (
    <>
      <nav className='navbar bg-body-tertiary'>
        <div className='container-fluid'>
          <NavLink className='NavBar-logo' to='/'>
            <p className='navbar-brand'>PókeDex</p>
          </NavLink>
          <div className='d-flex' role='search'>
            <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search' value={search} onChange={(e) => handleChange(e.target.value)} id='searchInput' onKeyDown={e => e.key === 'Enter' ? handleKeyDown() : ''} />
            <NavLink className='search-button' to='/search' id='busqueda'>
              <button className='btn btn-outline-success' onClick={() => searchData(search)}>
                Search
              </button>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
