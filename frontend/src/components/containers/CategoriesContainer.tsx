import React from 'react';
import style from './CategoriesContainer.module.css';
import GameThumbnail from './GameThumbnail';

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
    <div className={style.categoriesContainer + ' ' + 'flex column'}>
      {games.map((game, index) => (
        <a key={index} href={game.url}>
          <GameThumbnail image={game.image} alt={game.name} />
        </a>
      ))}
    </div>
  );
};

export default CategoriesContainer;
