import React from "react";
import styles from "./InfoGameModal.module.css";
import ticTacToe from "/public/images/tictactoe.png";
import blackjack from "/public/images/blackjack.png";
import rps from "/public/images/rps.png";
import simon from "/public/images/simon.png";
import bingo from "/public/images/bingo.png";
import connect4 from "/public/images/connect4.png";
import truco from "/public/images/truco.png";
import rpsls from "/public/images/rpsls/rpsls.jpg";
import arma from "/public/images/arma-palabra.png";
import quiz from "/public/images/quiz.png";

const InfoGameModal = ({
  isOpen,
  onClose,
  nameGame,
}: {
  isOpen: boolean;
  onClose: () => void;
  nameGame: string;
}) => {

  const gameInfo: { [key: string]: { name: string, description: string, image: string } } = {
    Simon: { 
      name: "Simon Dice",
      description: "Simon Dice es un juego de memoria en el que debes seguir y repetir una secuencia de colores y sonidos. Cada ronda agrega un paso más a la secuencia.",
      image: simon 
    },
    Tateti: { 
      name: "Ta-Te-Ti",
      description: "Ta-Te-Ti es un juego de estrategia simple donde dos jugadores alternan colocando X y O en una cuadrícula de 3x3. El objetivo es alinear tres de tus símbolos en fila, columna o diagonal.", 
      image: ticTacToe 
    },
    Bingo: { 
      name: "Bingo",
      description: "El Bingo es un juego de azar en el que los jugadores marcan números en una tarjeta a medida que se llaman aleatoriamente. El primero en completar una línea o toda la tarjeta gana.", 
      image: bingo 
    },
    Blackjack: { 
      name: "Blackjack",
      description: "El Blackjack es un juego de cartas en el que el objetivo es sumar 21 puntos sin pasarse. Los jugadores compiten contra el dealer, pidiendo cartas para acercarse lo más posible a 21.", 
      image: blackjack 
    },
    ArmaLaPalabra: { 
      name: "Arma la Palabra",
      description: "Arma la Palabra es un juego en el que debes formar palabras a partir de un conjunto de letras dadas. El objetivo es encontrar tantas palabras como sea posible en un tiempo limitado.", 
      image: arma 
    },
    Quiz: { 
      name: "Quiz",
      description: "Quiz es un juego de preguntas y respuestas donde los jugadores deben elegir la opción correcta entre varias alternativas. Las preguntas pueden ser de diferentes categorías y niveles de dificultad.", 
      image: quiz 
    },
    Truco: { 
      name: "Truco",
      description: "El Truco es un juego de cartas tradicional argentino para dos a seis jugadores. Utiliza una baraja española y combina estrategia, bluff y un sistema único de puntos y señas entre compañeros.", 
      image: truco 
    },
    connect4: { 
      name: "Cuatro en Línea",
      description: "Cuatro en Línea es un juego de estrategia para dos jugadores donde deben alinear cuatro fichas de su color en una cuadrícula antes que su oponente. Las fichas se colocan desde la parte superior de la columna.", 
      image: connect4 
    },
    PiedraPapelTijeras: { 
      name: "Piedra, Papel o Tijeras",
      description: "Piedra, Papel o Tijeras es un juego de manos simple para dos personas. Cada jugador elige uno de los tres elementos. Piedra vence a Tijeras, Tijeras vence a Papel y Papel vence a Piedra.", 
      image: rps 
    },
    PiedraPapelTijerasLagartoSpock: { 
      name: "Piedra, Papel, Tijeras, Lagarto o Spock",
      description: "Piedra, Papel, Tijeras, Lagarto, Spock es una versión ampliada del juego clásico. Las reglas son las mismas pero se agregan Lagarto y Spock, que introducen nuevas combinaciones y resultados.", 
      image: rpsls 
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const imageUrl = gameInfo[nameGame].image;

  return (
    <div className={styles.InfoGameModalOverlay} onClick={handleOverlayClick}>
      <div className={styles.InfoGameModalContent}>
        <button className={styles.InfoGameModalClose} onClick={onClose}>
          X
        </button>
        <h1 className="text-white">{gameInfo[nameGame].name}</h1>
        <div className={styles.flexContainer}>
          <div className={styles.InfoGameModalButtons}>
          </div>
          <img src={imageUrl} alt={nameGame} className="max-w-40 m-auto" />
        </div>
          <div className={styles.infoText}>
              <p>{gameInfo[nameGame].description}</p>
          </div>
      </div>
    </div>
  );
};

export default InfoGameModal;
