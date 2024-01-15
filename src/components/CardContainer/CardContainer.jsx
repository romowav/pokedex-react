// import Card from '../components/Card/Card'
import '../Card/Card.css'
import './CardContainer.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const CardContainer = () => {
  const [pokeData, setPokeData] = useState([])
  const [tabNum, setTabNum] = useState()
  // const [totalTab, setTotalTab] = useState()

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => (
        setTabNum(response.data.count / 72)
      ))
  }, [])

  // Creo un array vacio en el nivel mas alto para almacenar la info despues
  const allUrl = []
  const urlBase = 'https://pokeapi.co/api/v2/pokemon/'
  // Creo una funcion para que me genere los URL y los almaceno en el array creado anteriormente
  const urlCreator1 = () => {
    for (let index = 1; index <= 72; index++) {
      allUrl.push(urlBase + index)
    }
    // console.log(allUrl)
  }
  urlCreator1()

  useEffect(() => {
    // creo un nuevo array en donde almacenare la data que reciva de mis request
    const allPokeData = []
    const getItemData = async () => {
      try {
        // utilizo el metodo axios.all para hacer varios request dinamicamente
        await axios.all(allUrl.map((endpoint) => (
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
    getItemData()
  }, [])
  // console.log(pokeData)
  // console.log(Number.isInteger(tabNum))
  const createTabs = () => {
    const tabs = [] // Crear un array para almacenar los elementos del bucle

    if (Number.isInteger(tabNum) === true) {
      for (let index = 1; index <= tabNum; index++) {
        // Agregar elementos al array en lugar de solo crearlos
        tabs.push(
          <li className='page-item' key={index}>
            <button className='page-link'>
              {index}
            </button>
          </li>
        )
      }
    } else {
      const repeat = Math.trunc(tabNum + 1)
      for (let index = 1; index < repeat; index++) {
        // Agregar elementos al array en lugar de solo crearlos
        tabs.push(
          <li className='page-item' key={index}>
            <button className='page-link'>
              {index}
            </button>
          </li>
        )
      }
    }

    return tabs // Devolver el array de elementos creados
  }

  return (
    <>
      <h1>Container component</h1>

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
            <div className='card m-2' key={pokemon.id}>
              <div className='img-cont'>
                <img src={pokemon.sprites.front_default} className='card-img-top' alt={pokemon.name} />
              </div>
              <div className='card-body-romo'>
                <h5 className='card-title'>{pokemon.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CardContainer
