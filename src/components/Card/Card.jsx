import './Card.css'

const Card = (props) => {
  const pokemon = props.pokeObj

  return (
    <>
      <div className='card m-2'>
        <div className='img-cont'>
          <img src={pokemon.sprites.front_default} className='card-img-top' alt={pokemon.name} />
        </div>
        <div className='card-body-romo'>
          <h5 className='card-title'>{pokemon.name}</h5>
        </div>
      </div>
    </>
  )
}

export default Card
