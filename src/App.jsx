import 'bootstrap/dist/css/bootstrap.min.css'
// import { SearchProvider } from './context/SeacrhContext'
import { BrowserRouter } from 'react-router-dom'
import RoutesIndex from './routes/RoutesIndex'
import Navbar from './components/Navbar/Navbar'
import './App.css'

function App () {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <RoutesIndex />
      </BrowserRouter>
    </>
  )
}

export default App
