import React, { useState, useEffect } from 'react';
import './Blackjack.css'
import axios from 'axios'

const Blackjack = () => {
  const [deck, setDeck] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    // Fetch a new deck
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/')
      .then(response => setDeck(response.data))
      .catch(error => console.error('Error fetching deck:', error));
  }, []);

  const drawCards = () => {
    if (deck) {
      axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`)
        .then(response => setCards(response.data.cards))
        .catch(error => console.error('Error drawing cards:', error));
    }
  };
  
  return (
    <div className='flex center align'>
      <button onClick={drawCards}>Draw Cards</button>
      <div className="cards">
        {cards.map(card => (
          <img key={card.code} src={card.image} alt={card.code} />
        ))}
      </div>
    </div>
  )
}

export default Blackjack