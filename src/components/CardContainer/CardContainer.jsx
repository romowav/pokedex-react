import Card from '../Card/Card'
import '../Card/Card.css'
import './CardContainer.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const CardContainer = () => {
  const [pokeData, setPokeData] = useState([])
  const [tabNum, setTabNum] = useState()
  const [tabValue, setTabValue] = useState(1)
  // Creo un array vacio en el nivel mas alto para almacenar la info despues
  const allUrl = []
  const urlBase = 'https://pokeapi.co/api/v2/pokemon/'

  useEffect(() => {
    console.log(tabValue)
  })

  // Obtengo total de pokemones para saber cuantos tab necesito
  useEffect(() => {
    const getPokeTotal = async () => {
      try {
        await axios.get(urlBase)
          .then((response) => (
            setTabNum((response.data.count - 277) / 72)
          ))
      } catch (error) {
        throw new Error(error)
      }
    }
    getPokeTotal()
  }, [])
  // Aqui esta la logica para crear dinamicamente las "tabs" de pagination
  //
  const createTabs = () => {
    const tabs = [] // Crear un array para almacenar los elementos del bucle
    if (Number.isInteger(tabNum) === true) {
      for (let index = 1; index <= tabNum; index++) {
        const idIndex = `romo-id-${index}`
        // Agregar elementos al array en lugar de solo crearlos
        tabs.push(
          <li className='page-item romo-list' id={idIndex} key={index} value={index * 72}>
            <button
              className='page-link' value={index} onClick={(e) => {
                urlCreator2(((index * 72) - 71), (index * 72))
                setTabValue(e.target.value)
              }}
            >
              {index}
            </button>
          </li>
        )
      }
    } else {
      const repeat = Math.trunc(tabNum + 1)
      for (let index = 1; index <= repeat; index++) {
        const idIndex = `romo-id-${index}`
        // Agregar elementos al array en lugar de solo crearlos
        tabs.push(
          <li className='page-item romo-list' id={idIndex} key={index} value={index * 72}>
            <button
              className='page-link' value={index} onClick={(e) => {
                urlCreator2(((index * 72) - 71), (index * 72))
                setTabValue(e.target.value)
              }}
            >
              {index}
            </button>
          </li>
        )
      }
    }
    return tabs // Devolver el array de elementos creados
  }

  const previousTab = () => {
    if (tabValue <= 1) {
      throw new Error('no puedes bajar mas')
    } else {
      const oldIndex = tabValue - 1
      urlCreator2(((oldIndex * 72) - 71), (oldIndex * 72))
      setTabValue(oldIndex)
    }
  }

  const nextTab = () => {
    const maxTab = Math.trunc(tabNum + 1)
    if (tabValue >= maxTab) {
      throw new Error('no puedes subir mas')
    } else {
      const oldIndex = tabValue + 1
      urlCreator2(((oldIndex * 72) - 71), (oldIndex * 72))
      setTabValue(oldIndex)
    }
  }

  // Creo una funcion para que me genere los URL y los almaceno en el array creado anteriormente
  const urlCreator1 = () => {
    for (let index = 1; index <= 72; index++) {
      allUrl.push(urlBase + index)
    }
  }
  urlCreator1()

  const urlCreator2 = (starter, repeater) => {
    allUrl.length = 0
    for (let index = starter; index <= repeater; index++) {
      if (index <= 1025) {
        allUrl.push(urlBase + index)
      }
    }
    const allPokeData = []
    const getItemData = async (pokeUrl) => {
      try {
        // utilizo el metodo axios.all para hacer varios request dinamicamente
        await axios.all(pokeUrl.map((endpoint) => (
          axios.get(endpoint)
          // Aqui especifico que en caso de ser exitoso, almacenamos cada respuesta con .push
            .then((response) => (
              allPokeData.push(response.data)
            ))
        )))
        // Para evitar que se desordenen la info, debido a que algunos HTTP request llegan antes que otros, uso el metodo .sort para acomodarlos por el id
        allPokeData.sort(function (x, y) {
          return x.id - y.id
        })
        // Almaceno mi informacion en mi hook para tenerlo de manera global
        setPokeData(allPokeData)
      } catch (error) {
        throw new Error(error)
      }
    }
    getItemData(allUrl)
  }

  useEffect(() => {
    // creo un nuevo array en donde almacenare la data que reciva de mis request
    const allPokeData = []
    const getItemData = async (pokeUrl) => {
      try {
        // utilizo el metodo axios.all para hacer varios request dinamicamente
        await axios.all(pokeUrl.map((endpoint) => (
          axios.get(endpoint)
          // Aqui especifico que en caso de ser exitoso, almacenamos cada respuesta con .push
            .then((response) => (
              allPokeData.push(response.data)
            ))
        )))
        // Para evitar que se desordenen la info, debido a que algunos HTTP request llegan antes que otros, uso el metodo .sort para acomodarlos por el id
        allPokeData.sort(function (x, y) {
          return x.id - y.id
        })
        // Almaceno mi informacion en mi hook para tenerlo de manera global
        setPokeData(allPokeData)
      } catch (error) {
        throw new Error(error)
      }
    }
    getItemData(allUrl)
  }, [])

  return (
    <>
      <div className='master-container'>
        <nav aria-label='Page navigation pokedex'>
          <ul className='pagination m-3'>
            <li className='page-item'>
              <button className='page-link' href='#' aria-label='Previous' onClick={previousTab}>
                <span aria-hidden='true'>«</span>
              </button>
            </li>
            {tabNum && createTabs()}
            <li className='page-item'>
              <a className='page-link' href='#' aria-label='Next' onClick={nextTab}>
                <span aria-hidden='true'>»</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className='d-flex flex-row flex-wrap justify-content-center container-romo'>
          {pokeData && pokeData.map((pokemon) => (
            <Card pokeObj={pokemon} key={pokemon.id} />
          ))}
        </div>
        <nav aria-label='Page navigation pokedex'>
          <ul className='pagination m-3'>
            <li className='page-item'>
              <button className='page-link' href='#' aria-label='Previous' onClick={previousTab}>
                <span aria-hidden='true'>«</span>
              </button>
            </li>
            {tabNum && createTabs()}
            <li className='page-item'>
              <button className='page-link' href='#' aria-label='Next' onClick={nextTab}>
                <span aria-hidden='true'>»</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default CardContainer
