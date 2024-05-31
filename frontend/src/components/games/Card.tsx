import React from "react";
import Back from "../../../public/images/cartas/back.png";

type CardProps = {
  valor: string;
  palo: string;
  src: string;
  tapada?: boolean;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ valor, palo, src, tapada, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      {tapada ? (
        <img src={Back} alt="Carta tapada" />
      ) : (
        <img src={src} alt={`${valor} de ${palo}`} />
      )}
    </div>
  );
};

export default Card;
