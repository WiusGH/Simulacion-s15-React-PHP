import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css";
import GameThumbnail from "../containers/GameThumbnail";

interface Game {
  image: string;
  alt: string;
  url: string;
}

interface SliderProps {
  games: Game[];
}

const Slider: React.FC<SliderProps> = ({ games }) => {
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
        className="mySwiper"
      >
        {games.map((game) => (
          <SwiperSlide className="flex column" key={game.alt}>
            <a href={game.url}>
              <GameThumbnail image={game.image} alt={game.alt} />
            </a>
            <p>{game.alt}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
