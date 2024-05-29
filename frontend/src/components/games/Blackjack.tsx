import { useState, useEffect } from "react";
import "./Blackjack.css";
import axios from "axios";
import cardBack from "../../../public/images/cardBack.png";
import GenericButton from "../buttons/GenericButton";

interface Card {
  code: string;
  image: string;
  value: string;
  suit: string;
}

interface Deck {
  deck_id: string;
  remaining: number;
  shuffled: boolean;
  success: boolean;
}

const Blackjack = () => {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Obtiene 6 mazos de carta para inciar el juego
  const newDeck = async () => {
    try {
      const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6");
      setDeck(response.data);
    } catch (error) {
      console.error("Error fetching deck:", error);
    }
  };

  // Obtieneun mazo al cargar la página
  useEffect(() => {
    newDeck();
  }, []);

  // Obtiene las cartas iniciales para el dealer y el jugador
  const initialDraw = async () => {
    if (deck) {
      try {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=4`);
        const cards = response.data.cards;
        // TODO: detectar si el jugador o la casa obtiene un Blacjack al iniciar
        setPlayerCards([cards[0], cards[1]]);
        setDealerCards([cards[2], cards[3]]);
        calculateScores([cards[0], cards[1]], [cards[2], cards[3]]);
      } catch (error) {
        console.error("Error drawing initial cards:", error);
      }
    }
  };

  // Obtiene una carta extra para el jugador
  const drawCard = async () => {
    if (deck) {
      try {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
        const newCard = response.data.cards[0];
        setPlayerCards(prevCards => {
          const updatedCards = [...prevCards, newCard];
          calculateScores(updatedCards, dealerCards);
          return updatedCards;
        });
      } catch (error) {
        console.error("Error drawing card:", error);
      }
    }
  };

  // Obtiene la puntuación de la carta
  const getCardValue = (card: Card): number => {
    if (["KING", "QUEEN", "JACK"].includes(card.value)) {
      return 10;
    } else if (card.value === "ACE") {
      return 11;
    } else {
      return parseInt(card.value, 10);
    }
  };

  // Calcula la puntuación de las cartas
  const calculateScores = (playerCards: Card[], dealerCards: Card[]) => {
    const calculateScore = (cards: Card[]): number => {
      let score = cards
        .filter(card => card.value !== "ACE")
        .reduce((acc, card) => acc + getCardValue(card), 0);
      cards
        .filter(card => card.value === "ACE")
        .forEach(() => {
          if (score + 11 <= 21) score += 11;
          else score += 1;
        });
      return score;
    };
    setPlayerScore(calculateScore(playerCards));
    setDealerScore(calculateScore(dealerCards));
  };

  // Inicia el juego, reinicia las manos y puntajes y reparte nuevamente
  const startGame = () => {
    setGameOver(false);
    setPlayerCards([]);
    setDealerCards([]);
    setPlayerScore(0);
    setDealerScore(0);
    setGameStarted(true);
    initialDraw();
  };

  // Finaliza el juego, obtiene un juego de mazos nuevos y permite ver las cartas antes de comenzar un juego nuevo
  const endGame = () => {
    checkScores();
    newDeck();
    setGameStarted(false);
    setGameOver(true);
  };

  // TODO: Acomodar lógica de puntajes ya que no se están sumando bien
  const checkScores = async () => {
    console.log("Player score:", playerScore);
    console.log("Dealer score:", dealerScore);
    if (dealerScore < 17 && deck) {
      try {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
        const newCard = response.data.cards[0];
        setDealerCards(prevCards => {
          const updatedCards = [...prevCards, newCard];
          calculateScores(playerCards, updatedCards);
          return updatedCards;
        });
      } catch (error) {
        console.error("Error drawing card:", error);
      }
    }

    if (dealerScore > 21) {
      alert("¡El jugador gana!");
    } else if (playerScore > 21) {
      alert("¡La casa gana!");
    } else if (dealerScore > playerScore) {
      alert("¡La casa gana!");
    } else if (dealerScore < playerScore) {
      alert("¡El jugador gana!");
    } else {
      alert("¡Empate!");
    }
  };

  return (
    // TODO: agregar borde para simular una mesa de casino
    <div className="flex column center align">
      <div className="flex align cards">
        <p>Dealer:</p>
        {gameOver ? dealerCards.map((card: Card, index: number) => (
          <img key={index} src={card.image} alt={card.value} className="card" />)): (gameStarted ? (
          <>
            <img src={cardBack} alt="Card Back" className="card" />
            {dealerCards.length > 1 && (
              <img src={dealerCards[1].image} alt="Card" className="card" />
            )}
          </>
        ) : (
          <>
            <img src={cardBack} alt="Card Back" className="card" />
            <img src={cardBack} alt="Card Back" className="card" />
          </>
        ))}
      </div>
      {/* TODO: agregar separador */}
      <div className="flex align cards">
        <p>Player:</p>
        {gameOver ? playerCards.map((card: Card, index: number) => ( 
        <img key={index} src={card.image} alt={card.value} className="card" />
        )) : (gameStarted ? playerCards.map((card: Card, index: number) => (
          <img key={index} src={card.image} alt={card.value} className="card" />
        )):(
          <>
            <img src={cardBack} alt="Card Back" className="card" />
            <img src={cardBack} alt="Card Back" className="card" />
          </>
        ))}
      </div>
      {/* TODO: agregar separador */}
      {gameStarted ? (
        <>
          <GenericButton text="Pedir" func={drawCard} />
          <GenericButton text="Finalizar" func={endGame} />
        </>
      ) : (
        <GenericButton text="Iniciar juego" func={startGame} />
      )}
    </div>
  );
};

export default Blackjack;
