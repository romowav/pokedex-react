import { useSearchContext } from '../hooks/useSearchContext'
import '../components/DetailsContainer/DetailsContainer.css'

const SearchDetails = () => {
  const { pokeSearch } = useSearchContext()

  const {
    sprites,
    abilities,
    base_experience,
    height,
    id,
    name,
    types,
    weight
  } = pokeSearch
  console.log(types)

  function pokeAbility (data) {
    const abilidadespoke = []
    for (let i = 0; i < data.length; i++) {
      abilidadespoke.push(data[i].ability.name)
    }
    return abilidadespoke.join(' - ')
  }

  function pokeType (data) {
    const tiposPoke = []
    for (let i = 0; i < data.length; i++) {
      tiposPoke.push(data[i].type.name)
    }
    return tiposPoke.join(' - ')
  }

  return (
    <>
      {pokeSearch &&
        <div className='details-container'>
          <div className='img-container'>
            <img src={sprites.front_default} className='d-block' alt={'image of ' + name} />
          </div>
          <h2>{name}</h2>
          <table className='table table-fixed'>
            <thead>
              <tr>
                <th scope='col' className='w-50' />
                <th scope='col' className='w-50' />
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>Index</th>
                <td>{id}</td>
              </tr>
              <tr>
                <th scope='row'>Weight</th>
                <td>{weight}</td>
              </tr>
              <tr>
                <th scope='row'>Height</th>
                <td>{height}</td>
              </tr>
              <tr>
                <th scope='row'>Base Expierence</th>
                <td>{base_experience}</td>
              </tr>
              <tr>
                <th scope='row'>Abilities</th>
                <td>{pokeAbility(abilities)}</td>
              </tr>
              <tr>
                <th scope='row'>Types</th>
                <td>{pokeType(types)}</td>
              </tr>
            </tbody>
          </table>
        </div>}
    </>
  )
}

export default SearchDetails
