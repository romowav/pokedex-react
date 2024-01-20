import { Routes, Route } from 'react-router-dom'
import { Home, SearchDetails } from '../pages'

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:name' element={<SearchDetails />} />
    </Routes>
  )
}

export default RoutesIndex
