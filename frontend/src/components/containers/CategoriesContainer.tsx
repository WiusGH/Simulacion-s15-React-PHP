import React from "react";
import style from "./CategoriesContainer.module.css";
import GameThumbnail from "./GameThumbnail";

interface Game {
  name: string;
  image: string;
  url: string;
  categories: string[];
}

interface CategoriesContainerProps {
  games: Game[];
}

const CategoriesContainer: React.FC<CategoriesContainerProps> = ({ games }) => {
  return (
    <div className={style.categoriesContainer + " " + "flex evenly"}>
      {games.map((game, index) => (
        <div className="flex column align">
          <a key={index} href={game.url}>
            <GameThumbnail image={game.image} alt={game.name} />
          </a>
          <p className={style.title}>{game.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoriesContainer;
