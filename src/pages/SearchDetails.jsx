import Card from '../components/Card/Card'
import { useSearchContext } from '../hooks/useSearchContext'

const SearchDetails = () => {
  const { pokeSearch } = useSearchContext()
  console.log('search details: pokeSearch - ', pokeSearch)

  return (
    <>
      <h1>Search Deatils</h1>
      {pokeSearch && <Card pokeObj={pokeSearch} key={pokeSearch.id} />}
    </>
  )
}

export default SearchDetails
