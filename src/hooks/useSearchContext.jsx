import { useContext } from 'react'
import { SearchContext } from '../context/SeacrhContext'

export const useSearchContext = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext debe estar dentro del proveedor SearchProvider')
  }
  return context
}
