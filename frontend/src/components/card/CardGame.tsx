import { Link } from "react-router-dom";

interface Game {
  image: string;
  alt: string;
  url: string;
}

interface Props {
  findGame: Game;
}

const CardGame = ({ findGame }: Props) => {
  if (findGame.alt === "empy") return;

  return (
    <div className="h-[280px]  bg-[#E8DCF4]">
      <h3 className="w-1/2 m-auto text-2xl text-center tracking-wider rounded-xl py-2 text-[#E8DCF4] bg-[#4F1B83]">
        {findGame.alt}
      </h3>
      <figure className="w-4/5 h-48 m-auto mt-2 ">
        <Link to={findGame.url}>
          <img
            className="w-full h-full object-contain"
            src={findGame.image}
            alt={findGame.alt}
          />
        </Link>
      </figure>
    </div>
  );
};
export default CardGame;
