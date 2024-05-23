import React from "react";
import { useParams } from "react-router-dom"; // Obtiene parámetros de la url
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import MainContainer from "../components/containers/MainContainer";
import Error404 from "./Error404";
import Simon from "../components/games/Simon";
import Tateti from "../components/games/Tateti";
import Sidebar from "../components/sidebar/SideBar";
// Importar otros juegos a medida que se vayan creando

const GameViewer: React.FC = () => {
  // Obtiene el nombre del juego de la url
  const { game } = useParams<{ game: string }>();
  const games: { [key: string]: JSX.Element } = {
    simon: <Simon />,
    tateti: <Tateti />,
    // Colocar acá los juegos que se vayan agregando
  };

  // Muestra la página 404 al no encontrar el juego
  // TODO: Crear página 404
  const selectedGame = game ? games[game.toLowerCase()] : undefined;
  const selectedGameName = game || "";

  if (!selectedGame) {
    return <Error404 />;
  }

  return (
    <div>
      <Header />
      <div className="flex">
        <MainContainer game={selectedGame} /> {/* Muestra dinámicamente el juego seleccionado */}
        <Sidebar game={selectedGameName} />
      </div>
      <Footer />
    </div>
  );
};

export default GameViewer;
