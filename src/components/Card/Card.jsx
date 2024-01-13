import './Card.css'

const Card = (pokemon) => {
  return (
    <>
      <div className='card'>
        <div className='img-cont'>
          <img src='https://w7.pngwing.com/pngs/191/193/png-transparent-heart-free-content-small-valentine-s-love-heart-presentation-thumbnail.png' className='card-img-top' alt='...' />
        </div>
        <div className='card-body-romo'>
          <h5 className='card-title'>Card title</h5>
        </div>
      </div>
    </>
  )
}

export default Card
