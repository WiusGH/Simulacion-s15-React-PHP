import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css";
import { Pagination } from "swiper/modules";
import GameThumbnail from "../containers/GameThumbnail";
("../containers/GameThumbnail.tsx");
import ticTacToe from "../../../public/images/tictactoe.png";
import blackjack from "../../../public/images/blackjack.png";
import rps from "../../../public/images/rps.png";
import simon from "../../../public/images/simon.png";
import bingo from "../../../public/images/bingo.png";
import connect4 from "../../../public/images/connect4.png";
import truco from "../../../public/images/cartas/12Copas.jpg";
import rpsls from "../../../public/images/rpsls/rpsls.jpg";
import palabra from "../../../public/images/palabra.jpeg";
import quiz from "../../../public/images/quiz.png";

const Slider = () => {
  const [games, setGames] = useState<
    { image: string; alt: string; url: string }[]
  >([]);

  useEffect(() => {
    setGames([
      {
        image: ticTacToe,
        alt: "Tic tac toe",
        url: "/jugar/Tateti",
      },
      {
        image: blackjack,
        alt: "Blackjack",
        url: "/jugar/Blackjack",
      },
      {
        image: connect4,
        alt: "4 en línea",
        url: "/jugar/connect4",
      },
      {
        image: simon,
        alt: "Simon",
        url: "/jugar/Simon",
      },
      {
        image: bingo,
        alt: "Bingo",
        url: "/jugar/Bingo",
      },
      {
        image: rps,
        alt: "Rock Paper Scissors",
        url: "/jugar/PiedraPapelTijeras",
      },
      {
        image: rpsls,
        alt: "Piedra, papel, tijeras, lagarto o Spock",
        url: "/jugar/PiedraPapelTijerasLagartoSpock",
      },
      {
        image: truco,
        alt: "Truco",
        url: "/jugar/Truco",
      },
      {
        image: arma,
        alt: "Arma la palabra",
        url: "/jugar/ArmaLaPalabra",
      },
      {
        image: quiz,
        alt: "Quiz",
        url: "/jugar/Quiz",
      },
    ]);
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1920: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="mySwiper">
        {games.map((game) => (
          <SwiperSlide key={game.alt}>
            <a href={game.url}>
              <GameThumbnail
                image={game.image.toString()}
                alt={game.alt.toString()}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
