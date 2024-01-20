import Card from '../Card/Card'
import '../Card/Card.css'
import './CardContainer.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const CardContainer = () => {
  const [pokeData, setPokeData] = useState([])
  const [tabNum, setTabNum] = useState()
  // Creo un array vacio en el nivel mas alto para almacenar la info despues
  const allUrl = []
  const urlBase = 'https://pokeapi.co/api/v2/pokemon/'

  // Obtengo total de pokemones para saber cuantos tab necesito
  useEffect(() => {
    const getPokeTotal = async () => {
      try {
        await axios.get(urlBase)
          .then((response) => (
            setTabNum(response.data.count / 72)
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
            <button className='page-link' onClick={() => { urlCreator2(((index * 72) - 71), (index * 72)) }}>
              {index}
            </button>
          </li>
        )
      }
    } else {
      const repeat = Math.trunc(tabNum + 1)
      for (let index = 1; index <= repeat; index++) {
        const idIndex = `romo-id-${index}`
        // const liValue = document.getElementById(idIndex).getAttribute('value')
        // Agregar elementos al array en lugar de solo crearlos
        tabs.push(
          <li className='page-item romo-list' id={idIndex} key={index} value={index * 72}>
            <button className='page-link' onClick={() => { urlCreator2(((index * 72) - 71), (index * 72)) }}>
              {index}
            </button>
          </li>
        )
      }
    }
    return tabs // Devolver el array de elementos creados
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
    // const start = repeater / 72
    for (let index = starter; index <= repeater; index++) {
      allUrl.push(urlBase + index)
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
          <ul className='pagination'>
            <li className='page-item'>
              <a className='page-link' href='#' aria-label='Previous'>
                <span aria-hidden='true'>«</span>
              </a>
            </li>
            {tabNum && createTabs()}
            <li className='page-item'>
              <a className='page-link' href='#' aria-label='Next'>
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
      </div>
    </>
  )
}

export default CardContainer
