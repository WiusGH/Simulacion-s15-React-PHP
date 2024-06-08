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
import { useState } from "react";

interface Game {
  image: string;
  alt: string;
  url: string;
}

const SearchGame = () => {
  const allGames = [
    { image: ticTacToe, alt: "Tateti", url: "/jugar/Tateti" },
    { image: blackjack, alt: "Blackjack", url: "/jugar/Blackjack" },
    { image: connect4, alt: "4 en línea", url: "/jugar/connect4" },
    { image: simon, alt: "Simón", url: "/jugar/Simon" },
    { image: bingo, alt: "Bingo", url: "/jugar/Bingo" },
    {
      image: rps,
      alt: "Piedra, papel o tijeras",
      url: "/jugar/PiedraPapelTijeras",
    },
    {
      image: rpsls,
      alt: "Piedra, papel, tijeras, lagarto o Spock",
      url: "/jugar/PiedraPapelTijerasLagartoSpock",
    },
    { image: truco, alt: "Truco", url: "/jugar/Truco" },
    { image: arma, alt: "Arma la palabra", url: "/jugar/ArmaLaPalabra" },
    { image: quiz, alt: "Quiz", url: "/jugar/Quiz" },
  ];

  const initialFindGame: Game = {
    image: "empy",
    alt: "empy",
    url: "empy",
  };

  const [findGame, setFindGame] = useState<Game>(initialFindGame);
  const [notFound, setNotFound] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleSearch = (toggle: boolean): void => {
    setToggleSearch(toggle);
    setFindGame(initialFindGame);
  };

  const handleSearchGame = (search: string): void => {
    const getGame = allGames?.find((game) => game.alt === search);

    if (getGame === undefined) {
      handleError(true);
      setFindGame(initialFindGame);
    }

    if (getGame) {
      setFindGame(getGame);
      handleError(false);
    }
  };

  const handleError = (error: boolean): void => {
    setNotFound(error);
  };

  const handleToggleMenu = (): void => {
    setToggleMenu((prev) => !prev);
  };

  return {
    handleToggleSearch,
    handleSearchGame,
    handleError,
    handleToggleMenu,
    toggleMenu,
    toggleSearch,
    allGames,
    notFound,
    findGame,
  };
};

export default SearchGame;
