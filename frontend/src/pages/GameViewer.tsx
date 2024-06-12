import React from "react";
import { useParams } from "react-router-dom"; // Obtiene parámetros de la url
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import MainContainer from "../components/containers/MainContainer";
import Error404 from "./Error404";
import Simon from "../components/games/Simon";
import Tateti from "../components/games/Tateti";
import Blackjack from "../components/games/Blackjack";
import Bingo from "../components/games/Bingo";
import Weapon from "../components/games/arma-palabra/Weapon";
import Quiz from "../components/games/quiz/Quiz";
import TrucoGame from "../components/games/Truco";
import Connect4 from "../components/games/Connect4";
import RockPaperScissors from "../components/games/RockPaperScissors";
import RockPaperScissorsLizardSpock from "../components/games/RockPaperScissorsLizardSpock";
// Importar otros juegos a medida que se vayan creando

const GameViewer: React.FC = () => {
  // Obtiene el nombre del juego de la url
  const { game } = useParams<{ game: string }>();
  const games: { [key: string]: JSX.Element } = {
    simon: <Simon />,
    tateti: <Tateti />,
    bingo: <Bingo />,
    blackjack: <Blackjack />,
    armalapalabra: <Weapon />,
    quiz: <Quiz />,
    truco: <TrucoGame />,
    connect4: <Connect4 />,
    piedrapapeltijeras: <RockPaperScissors />,
    piedrapapeltijeraslagartospock: <RockPaperScissorsLizardSpock />,
    // Colocar acá los juegos que se vayan agregando
  };
  // Muestra la página 404 al no encontrar el juego
  const selectedGame = game ? games[game.toLowerCase()] : undefined;
  const selectedGameName = game || "";

  if (!selectedGame) {
    return <Error404 />;
  }

  return (
    <div>
      <Header />
      <div className="flex">
        <MainContainer game={selectedGame} gameName={selectedGameName} />{" "}
        {/* Muestra dinámicamente el juego seleccionado */}
      </div>
      <Footer />
    </div>
  );
};

export default GameViewer;
