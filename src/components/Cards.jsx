import React, { useEffect, useState } from 'react';
import Loading from './Loading';

const url = 'https://course-api.com/react-tours-project'

function Cards() {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [readMore, setReadMore] = useState(false)

  const fetchTours = async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const tours = await response.json()
      setLoading(false)
      setCards(tours)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  const handleRemove = (id) => {
    const filteredItem = cards.filter((item) => item.id !== id);
    setCards(filteredItem);
  };
  return (
    <>

      <header className='heading'>
        <div className='title'>
          <h1>{cards.length === 0 ? 'No Tours left' : 'Our Tours'}</h1>
        </div>
        <div className='dividers'>
          <div className='divider' />
        </div>

        {
          cards.length === 0 ? <div className='refreash_div'><a href="/">Refreash</a></div> : <div className=''></div>
        }
      </header>

      <div className="card_body">
        {
          cards.map(card => (
            <div className="card" key={card.id}>
              <div className="card_image">
                <img src={card.image} alt={card.title} />
                <div className="price">${card.price}</div>
              </div>
              <div className="card_content">
                <h2>{card.name}</h2>
                <p>
                  {readMore ? card.info :  `${card.info.substring(0, 200)}...`}
                  <button className='read' onClick={()=> setReadMore(!readMore)}>
                    {readMore ? 'show less' : 'Read More'}
                  </button>
                </p>
              </div>

              <div className="button">
                <button onClick={()=> handleRemove(card.id)} className='btn'>Not Interested</button>
              </div>
            </div>
          ))
        }
      </div>

    </>
  )
}

export default Cards
