import { useState, useEffect } from "react";
import style from "./Blackjack.module.css";
import axios from "axios";
import cardBack from "../../../public/images/cardBack.png";
import GenericButton from "../buttons/GenericButton";
import Swal from "sweetalert2";

interface Card {
  code: string;
  image: string;
  value: string;
}

interface Deck {
  deck_id: string;
}

const Blackjack = () => {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  // Obtiene un maso nuevo
  const newDeck = async () => {
    try {
      const response = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
      );
      setDeck(response.data);
    } catch (error) {
      console.error("Error fetching deck:", error);
    }
  };

  // Obtiene un maso nuevo an cargar la página
  useEffect(() => {
    newDeck();
  }, []);

  // Obtiene las primeras 2 cartas para cada jugador al iniciar el juego
  const initialDraw = async () => {
    if (deck) {
      try {
        const response = await axios.get(
          `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=4`
        );
        const cards = response.data.cards;
        setPlayerCards([cards[0], cards[1]]);
        setDealerCards([cards[2], cards[3]]);
        calculateScores([cards[0], cards[1]], [cards[2], cards[3]]);
      } catch (error) {
        console.error("Error al obtener las cartas iniciales:", error);
      }
    }
  };

  // Obtiene una nueva carta para el jugador
  const drawCard = async () => {
  // Asegura que el juego no haya finalizado y que el jugador no haya excedido los 21 puntos
  if (deck && gameStarted && playerScore <= 21 && !gameEnded) {
    try {
      const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      );
      const newCard = response.data.cards[0];
      const updatedPlayerCards = [...playerCards, newCard];
      const newScore = calculateScore(updatedPlayerCards);
      // Verificar si el jugador excedio los 21 puntos y termina el juego inmediatamente
      if (newScore > 21) {
        setPlayerCards(updatedPlayerCards);
        setPlayerScore(newScore);
        endGame(true);
      } else {
        setPlayerCards(updatedPlayerCards);
        setPlayerScore(newScore);
      }
    } catch (error) {
      console.error("Error drawing card:", error);
    }
  }
};

  // Calcula el valor de las cartas tomando en cuenta si el As debe contarse como 11 o como 1
  const calculateScore = (cards: Card[]): number => {
    let score = cards
      .filter((card) => card.value !== "ACE")
      .reduce((acc, card) => acc + getCardValue(card), 0);
    const aceCount = cards.filter((card) => card.value === "ACE").length;
    for (let i = 0; i < aceCount; i++) {
      if (score + 11 > 21) {
        score += 1;
      } else {
        score += 11;
      }
    }
    return score;
  };

  // Calcula el valor del dealer y del jugador
  const calculateScores = (playerCards: Card[], dealerCards: Card[]) => {
    const playerTotal = calculateScore(playerCards);
    const dealerTotal = calculateScore(dealerCards);
    setPlayerScore(playerTotal);
    setDealerScore(dealerTotal);
    if (playerTotal > 21) {
      endGame();
    }
  };

  const getCardValue = (card: Card): number => {
    if (["KING", "QUEEN", "JACK"].includes(card.value)) {
      return 10;
    } else if (card.value === "ACE") {
      return 11;
    } else {
      return parseInt(card.value, 10);
    }
  };

  // Verifica si el jugador o el dealer tienen un Blackjack
  const checkBlackjack = () => {
    if (
      playerScore === 21 &&
      playerCards.length === 2 &&
      dealerCards.length === 2
    ) {
      customAlert("¡El jugador tiene un Blackjack!");
      setGameEnded(true);
      setGameStarted(false);
    } else if (
      dealerScore === 21 &&
      playerCards.length === 2 &&
      dealerCards.length === 2
    ) {
      customAlert("¡El dealer tiene un Blackjack!");
      setGameEnded(true);
      setGameStarted(false);
    }
  };

  // Llama la función anterior cada vez que cambian los puntajes del jugador o del dealer
  useEffect(() => {
    if (gameStarted) {
      checkBlackjack();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerCards, dealerCards]);

  // Inicia un nuevo juego y reinicia los parámetros
  const startGame = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setPlayerScore(0);
    setDealerScore(0);
    setGameStarted(true);
    setGameEnded(false);
    initialDraw();
  };

  // Termina el juego y hace que el dealer saque cartas siempre y cuando el jugador no exceda los 21
  const endGame = async (playerBusted = false) => {
    setGameEnded(true);
    if (playerBusted) {
      customAlert("¡El dealer gana!");
      setGameStarted(false);
      return;
    }
    if (gameStarted) {
      let finalDealerScore = dealerScore;
      let updatedDealerCards = dealerCards;
      while (finalDealerScore < 17 && deck) {
        try {
          const response = await axios.get(
            `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
          );
          const newCard = response.data.cards[0];
          updatedDealerCards = [...updatedDealerCards, newCard];
          finalDealerScore = calculateScore(updatedDealerCards);
          setDealerCards(updatedDealerCards);
          setDealerScore(finalDealerScore);
        } catch (error) {
          console.error("Error drawing card:", error);
        }
      }

      let winner = null;
      if (playerScore > 21) {
        winner = "¡El dealer gana!";
      } else if (finalDealerScore > 21) {
        winner = "¡El jugador gana!";
      } else if (finalDealerScore > playerScore) {
        winner = "¡El dealer gana!";
      } else if (finalDealerScore < playerScore) {
        winner = "¡El jugador gana!";
      } else {
        winner = "¡Empate!";
      }
      customAlert(winner);
      setGameStarted(false);
    }
  };

  // Alerta personalizada
  const customAlert = (winner: string) => {
    Swal.fire({
      position: "center",
      title: winner,
      color: "black",
      timer: 2000,
      showConfirmButton: true,
      confirmButtonColor: "purple",
    });
  };

  return (
    <div className={`${style.container} + " flex column center align`}>
      <div className={style.innerContainer}>
        <div className="flex column center align">
          <p>Dealer: {gameEnded ? `(${dealerScore})` : "?"}</p>
          <div className="flex">
            {gameStarted ? (
              <>
                <img src={cardBack} alt="Card Back" className={style.card} />
                {dealerCards.length > 1 && (
                  <img
                    src={dealerCards[1].image}
                    alt="Card"
                    className={style.card}
                  />
                )}
              </>
            ) : (
              dealerCards.map((card: Card, index: number) => (
                <img
                  key={index}
                  src={card.image}
                  alt={card.value}
                  className={style.card}
                />
              ))
            )}
          </div>
        </div>
        <hr className={style.customHR}/>
        <div className="flex column align cards">
          <p>Jugador: ({playerScore})</p>
          <div className="flex">
            {playerCards.map((card: Card, index: number) => (
              <img
                key={index}
                src={card.image}
                alt={card.value}
                className={style.card}
              />
            ))}
          </div>
        </div>
        <div className="flex evenly">
        {!gameStarted ? (
          <>
          <GenericButton
              text="Nuevo Juego"
              func={startGame}
              disabled={gameStarted}
            />
            
          </>
        ) : (
          <>
          <GenericButton
              text="Pedir Carta"
              func={drawCard}
              disabled={!gameStarted}
            />
            <GenericButton
              text="Plantarse"
              func={() => endGame(false)}
              disabled={!gameStarted}
            />
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default Blackjack;
