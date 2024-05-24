import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css";
import { Pagination } from "swiper/modules";
import GameThumbnail from "../containers/GameThumbnail"; '../containers/GameThumbnail.tsx'
import ticTacToe from '../../../public/images/tictactoe.png';
import blackjack from '../../../public/images/blackjack.png';
import rps from '../../../public/images/rps.png';
import simon from '../../../public/images/simon.png';
import bingo from '../../../public/images/bingo.png';

const Slider = () => {

  const [games, setGames] = useState<{ image: string, alt: string, url: string }[]>([]);

  useEffect(() => {
    setGames([
      {
        image: ticTacToe,
        alt: 'Tic tac toe',
        url: '/jugar/Tictactoe',
      },
      {
        image: blackjack,
        alt: 'Blackjack',
        url: '/jugar/Blackjack',
      },
      {
        image: rps,
        alt: 'Rock Paper Scissors',
        url: '/jugar/RockPaperScissors',
      },
      {
        image: simon,
        alt: 'Simon',
        url: '/jugar/Simon'
      },
      {
        image: ticTacToe,
        alt: 'Tic tac toe',
        url: '/jugar/Tictactoe'
      },
      {
        image: bingo,
        alt: 'Bingo',
        url: '/jugar/Bingo'
      },
      {
        image: rps,
        alt: 'Rock Paper Scissors',
        url: '/jugar/RockPaperScissors'
      },
      {
        image: simon,
        alt: 'Simon',
        url: '/jugar/Simon'
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
            <a href={game.url}>
              <GameThumbnail image={game.image.toString()} alt={game.alt.toString()} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
