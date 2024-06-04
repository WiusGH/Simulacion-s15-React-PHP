import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CategoriesContainer from "../components/containers/CategoriesContainer";

import Error404 from "./Error404";
import ticTacToe from "../../public/images/tictactoe.png";
import blackjack from "../../public/images/blackjack.png";
import rps from "../../public/images/rps.png";
import rpsls from "/public/images/rpsls/rpsls.jpg";
import simon from "../../public/images/simon.png";
import bingo from "../../public/images/bingo.png";
import connect4 from "../../public/images/connect4.png";
import truco from "../../public/images/truco.png";
import palabra from "../../public/images/palabra.jpeg";
import quiz from "../../public/images/quiz.png";

interface Game {
  name: string;
  image: string;
  url: string;
  categories: string[];
}

const Categories: React.FC = () => {
  const [gameCategories, setGameCategories] = useState<{
    [key: string]: Game[];
  }>({
    cartas: [],
    estrategia: [],
    arcade: [],
    mesa: [],
    memoria: [],
    suerte: [],
    quiz: [],
  });

  useEffect(() => {
    const games: Game[] = [
      {
        name: "Tateti",
        image: ticTacToe,
        url: "/jugar/tateti",
        categories: ["estrategia", "arcade"],
      },
      {
        name: "Blackjack",
        image: blackjack,
        url: "/jugar/blackjack",
        categories: ["cartas", "mesa"],
      },
      {
        name: "Piedra, papel o tijeras",
        image: rps,
        url: "/jugar/PiedraPapelTijeras",
        categories: ["estrategia", "suerte", "arcade"],
      },
      {
        name: "Piedra, papel, tijeras, lagarto o Spock",
        image: rpsls,
        url: "/jugar/PiedraPapelTijerasLagartoSpock",
        categories: ["estrategia", "suerte", "arcade"],
      },
      {
        name: "Simon",
        image: simon,
        url: "/jugar/simon",
        categories: ["arcade", "memoria"],
      },
      {
        name: "Bingo",
        image: bingo,
        url: "/jugar/bingo",
        categories: ["mesa", "suerte"],
      },
      {
        name: "4 en línea",
        image: connect4,
        url: "/jugar/connect4",
        categories: ["estrategia", "mesa", "arcade"],
      },
      {
        name: "Truco",
        image: truco,
        url: "/jugar/truco",
        categories: ["cartas", "estrategia", "mesa"],
      },
      {
        name: "Arma la palabra",
        image: palabra,
        url: "/jugar/ArmaLaPalabra",
        categories: ["quiz"],
      },
      {
        name: "Quiz",
        image: quiz,
        url: "/jugar/Quiz",
        categories: ["quiz"],
      },
    ];

    const newGameCategories: { [key: string]: Game[] } = {
      cartas: [],
      estrategia: [],
      arcade: [],
      mesa: [],
      memoria: [],
      suerte: [],
      quiz: [],
    };

    games.forEach((game) => {
      game.categories.forEach((category) => {
        newGameCategories[category].push(game);
      });
    });

    setGameCategories(newGameCategories);
  }, []);

  const { category } = useParams<{ category: string }>();
  const selectedCategoryGames = category
    ? gameCategories[category.toLowerCase()]
    : undefined;

  if (!selectedCategoryGames || selectedCategoryGames.length === 0) {
    return <Error404 />;
  }

  return (
    <div>
      <Header />
      <div className="flex center">
        {/* Render dynamically the games according to the category */}
        <CategoriesContainer games={selectedCategoryGames} />
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
