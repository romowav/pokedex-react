import { useForm } from 'react-hook-form'

const Navbar = () => {
  const { register, handleSubmit } = useForm()
  const formData = (data) => {
    // Aqui agarro el valor de mi search bar, y lo tengo que asignar a mi contexto
    console.log(data)
  }
  return (
    <>
      <nav className='navbar bg-body-tertiary'>
        <div className='container-fluid'>
          <a className='navbar-brand'>PókeDex</a>
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
