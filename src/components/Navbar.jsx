import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSearchContext } from '../hooks/useSearchContext'

const Navbar = () => {
  const urlBase = 'https://pokeapi.co/api/v2/pokemon/'
  const { register, handleSubmit } = useForm()
  const { setPokeSearch } = useSearchContext()
  const formData = (data) => {
    // Aqui agarro el valor de mi search bar, y lo tengo que asignar a mi contexto
    // Primero agarro la informacion y la añado al URL que hara el fetch a la API
    const pokeName = data.search.trim()
    const nameLowC = pokeName.toLowerCase()
    const urlAPI = urlBase + nameLowC
    axios.get(urlAPI)
      .then((response) => {
        setPokeSearch(response.data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
  return (
    <>
      <nav className='navbar bg-body-tertiary'>
        <div className='container-fluid'>
          <div>
            <a className='navbar-brand'>PókeDex</a>
          </div>
          <form className='d-flex' role='search' onSubmit={handleSubmit(formData)}>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
              {...register('search')}
            />
            <button className='btn btn-outline-success' type='submit'>
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  )
}

export default Navbar
