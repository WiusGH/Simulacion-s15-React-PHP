import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css";
import { Pagination } from "swiper/modules";
import GameThumbnail from "../containers/GameThumbnail";'../containers/GameThumbnail.tsx'
import ticTacToe from '../../images/tictactoe.png';
import blackjack from '../../images/blackjack.png';
import rps from '../../images/rps.png';
import simon from '../../images/simon.png';

const Slider = () => {

  const [games, setGames] = useState<{image: string, alt: string}[]>([]);

  useEffect(() => {
    setGames([
      {
        image: ticTacToe,
        alt: 'Tic tac toe',
      },
      {
        image: blackjack,
        alt: 'Blackjack',
      },
      {
        image: rps,
        alt: 'Rock Paper Scissors',
      },
      {
        image: simon,
        alt: 'Simon',
      },
      {
        image: ticTacToe,
        alt: 'Tic tac toe',
      },
      {
        image: blackjack,
        alt: 'Blackjack',
      },
      {
        image: rps,
        alt: 'Rock Paper Scissors',
      },
      {
        image: simon,
        alt: 'Simon',
      },
    ]);
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {games.map((game) => (
          <SwiperSlide key={game.alt}>
            <GameThumbnail image={game.image.toString()} alt={game.alt.toString()} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
