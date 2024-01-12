import { createContext, useState } from 'react'
// Para poder crear un Context adecuadamente hay que hacer 3 cosas:
// 1.- El contexto
// 2.- El provedor
// 3.- El consumidor

// 1.- Aqui creo mi contexto, mi 'caja' donde almacenare mi informacion
const SearchContext = createContext()

// 2.- Aqui creo mi provedor, el cual va a ser el que envuelme a mis consumidores y en el cual le digo que informacion van a atener accesso a
function SearchProvider ({ children }) {
  const [pokeSearch, setPokeSearch] = useState([])

  const data = { pokeSearch, setPokeSearch }

  return (
    <SearchContext.Provider value={data}>
      {children}
    </SearchContext.Provider>
  )
}

// 3.- El consumidor lo defino en el hook que creo para mi contexto

export { SearchProvider, SearchContext }
