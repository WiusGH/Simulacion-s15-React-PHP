import "./InfoGameButton.css";
import { useState } from "react";
import InfoGameModal from "../modal/InfoGameModal";

const InfoGameButton = ({
  text,
  icon,
  nameGame,
}: {
  text: string;
  icon: React.ReactNode;
  nameGame: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="flex flex-col align info-game-button"
        onClick={handleOpenModal}
      >
        <div className="info-game-button-icon">{icon}</div>
        {text}
      </div>
      <InfoGameModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        nameGame={nameGame}
      />
    </>
  );
};

export default InfoGameButton;
