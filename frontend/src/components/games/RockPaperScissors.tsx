import React, { useRef, useState } from "react";
import style from "./RockPaperScissorsLizardSpock.module.css";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";
import GenericButton from "../buttons/GenericButton";
import { IconType } from "react-icons";

const choices = ["rock", "paper", "scissors"];
const choiceIcons: { [key: string]: IconType } = {
  rock: FaHandRock,
  paper: FaHandPaper,
  scissors: FaHandScissors,
};

const winningConditions: { [key: string]: string[] } = {
  rock: ["scissors"],
  paper: ["rock"],
  scissors: ["paper"],
};

const RockPaperScissors: React.FC = () => {
  const [player1Choice, setPlayer1Choice] = useState<string | null>(null);
  const [player2Choice, setPlayer2Choice] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [isSinglePlayer, setIsSinglePlayer] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const isReady = useRef(false);

  const startGame = (numPlayers: number) => {
    isReady.current = true;
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setResult("");
    setIsGameStarted(true);
    setIsSinglePlayer(numPlayers === 1);
  };

  const handlePlayerChoice = (choice: string, player: number) => {
    if (player === 1) {
      setPlayer1Choice(choice);
      if (isSinglePlayer) {
        const aiChoiceValue = getAIChoice();
        setPlayer2Choice(aiChoiceValue);
        isReady.current = true;
        determineWinner(choice, aiChoiceValue);
        setIsGameStarted(false);
      } else if (player2Choice !== null) {
        determineWinner(choice, player2Choice);
        isReady.current = true;
        setIsGameStarted(false);
      }
    } else if (player === 2) {
      setPlayer2Choice(choice);
      if (player1Choice !== null) {
        determineWinner(player1Choice, choice);
        isReady.current = true;
        setIsGameStarted(false);
      }
    }
  };

  const getAIChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineWinner = (choice1: string | null, choice2: string | null) => {
    if (!choice1 || !choice2) return;

    if (choice1 === choice2) {
      setResult("Empate");
    } else if (winningConditions[choice1].includes(choice2)) {
      setResult("Gana jugador 1");
    } else {
      setResult("Gana jugador 2");
    }
  };

  const resetGame = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setResult("");
    setIsGameStarted(false);
    setIsSinglePlayer(false);
    isReady.current = false;
  };

  const renderChoiceIcon = (choice: string | null, isPlayer1: boolean) => {
    if (player1Choice !== null && player2Choice !== null && choice !== null) {
      const IconComponent = choiceIcons[choice];
      const rotateClass = isPlayer1
        ? ["scissors"].includes(choice)
          ? style.mirror
          : style.rotateRight
        : ["scissors"].includes(choice)
        ? ""
        : style.rotateLeft;
      return <IconComponent className={`${style.hand} ${rotateClass}`} />;
    } else {
      return <RxQuestionMarkCircled className={style.hand} />;
    }
  };

  return (
    <div className={`${style.container} flex column align center`}>
      <h1 className={style.title}>Piedra, Papel, Tijeras</h1>
      <div className={`${style.innerContainer} flex center align evenly`}>
        <div className={style.choiceContainer}>
          {renderChoiceIcon(player1Choice, true)}
        </div>
        <div>VS.</div>
        <div className={style.choiceContainer}>
          {renderChoiceIcon(player2Choice, false)}
        </div>
      </div>
      <div className={style.buttonsContainer}>
        <div className={`${style.choiceButtons} flex center`}>
          {choices.map((choice, index) => (
            <button
              key={index}
              className={`${style.button} flex align center ${
                player1Choice == null && isReady.current ? "" : style.disabled
              }`}
              onClick={
                isGameStarted && player1Choice == null
                  ? () => handlePlayerChoice(choice, 1)
                  : undefined
              }
            >
              {choice}
            </button>
          ))}
        </div>
        <div className={`${style.choiceButtons} flex center`}>
          {choices.map((choice, index) => (
            <button
              key={index}
              className={`${style.button} flex align center ${
                player2Choice == null && isReady.current ? "" : style.disabled
              }`}
              onClick={
                isGameStarted && player2Choice == null
                  ? () => handlePlayerChoice(choice, 2)
                  : undefined
              }
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
      <div className={`${style.buttonsContainer} flex center align around`}>
        {isGameStarted ? (
          <GenericButton text="Reiniciar" func={resetGame} />
        ) : (
          <>
            <GenericButton text="1 jugador" func={() => startGame(1)} />
            <GenericButton text="2 jugadores" func={() => startGame(2)} />
          </>
        )}
      </div>
    </div>
  );
};

export default RockPaperScissors;
