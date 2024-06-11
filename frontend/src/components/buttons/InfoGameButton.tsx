import style from"./InfoGameButton.module.css";
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

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div
        className={`$"flex flex-col align ${style.infoGameButton}`}
        onClick={handleModal}
      >
        <div className={style.infoGameButtonIcon}>{icon}</div>
        {text}
      </div>
      <InfoGameModal
        isOpen={isModalOpen}
        onClose={handleModal}
        nameGame={nameGame}
      />
    </>
  );
};

export default InfoGameButton;
