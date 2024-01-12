import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import { SearchProvider } from './context/SeacrhContext'

function App () {
  return (
    <>
      <SearchProvider>
        <Navbar />
      </SearchProvider>
    </>
  )
}

export default App
