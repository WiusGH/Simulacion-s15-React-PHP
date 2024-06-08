import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Slider from "../components/slider/Slider";
import Title from "../components/slider/Title";
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

const Home = () => {
  const topGames = [
    { image: ticTacToe, alt: "Tateti", url: "/jugar/Tateti" },
    { image: blackjack, alt: "Blackjack", url: "/jugar/Blackjack" },
    { image: connect4, alt: "4 en línea", url: "/jugar/connect4" },
    { image: simon, alt: "Simón", url: "/jugar/Simon" },
    { image: bingo, alt: "Bingo", url: "/jugar/Bingo" },
  ];

  const newGames = [
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

  const recommendedGames = [
    { image: ticTacToe, alt: "Tateti", url: "/jugar/Tateti" },
    { image: connect4, alt: "4 en línea", url: "/jugar/connect4" },
    { image: bingo, alt: "Bingo", url: "/jugar/Bingo" },
    { image: truco, alt: "Truco", url: "/jugar/Truco" },
    { image: quiz, alt: "Quiz", url: "/jugar/Quiz" },
  ];

  return (
    <div>
      <Header />
      <Title text="Top juegos" />
      <Slider games={topGames} />
      <Title text="Juegos nuevos" />
      <Slider games={newGames} />
      <Title text="Juegos recomendados" />
      <Slider games={recommendedGames} />
      <Footer />
    </div>
  );
};

export default Home;
