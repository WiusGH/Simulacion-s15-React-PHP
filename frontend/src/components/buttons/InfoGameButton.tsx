import style from "./InfoGameButton.module.css";
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
      <div className={`${style.infoGameButton} flex column align center`} onClick={handleModal}>
        <div className={style.infoGameButtonIcon}>{icon}</div>
        <p>{text}</p>
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
