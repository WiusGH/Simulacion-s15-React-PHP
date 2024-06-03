import React, { useRef, useState } from "react";
import style from "./RockPaperScissorsLizardSpock.module.css";
import {
  FaHandRock,
  FaHandPaper,
  FaHandScissors,
  FaHandLizard,
  FaHandSpock,
} from "react-icons/fa";
import { RxQuestionMarkCircled } from "react-icons/rx";
import GenericButton from "../buttons/GenericButton";
import { IconType } from "react-icons";

const choices = ["rock", "paper", "scissors", "lizard", "spock"];
const choiceIcons: { [key: string]: IconType } = {
  rock: FaHandRock,
  paper: FaHandPaper,
  scissors: FaHandScissors,
  lizard: FaHandLizard,
  spock: FaHandSpock,
};

const winningConditions: { [key: string]: string[] } = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};

const RockPaperScissorsLizardSpock: React.FC = () => {
  const [player1Choice, setPlayer1Choice] = useState<string | null>(null);
  const [player2Choice, setPlayer2Choice] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [singlePlayer, setSinglePlayer] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const ready = useRef(false);

  const start = (players: number) => {
    ready.current = true;
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setResult("");
    setIsGameStarted(true);
    setSinglePlayer(players === 1);
  };

  const playersChoice = (choice: string, player: number) => {
    if (player === 1) {
      setPlayer1Choice(choice);
      if (singlePlayer) {
        const aiChosen = aiChoice();
        setPlayer2Choice(aiChosen);
        ready.current = true;
        setWinner(choice, aiChosen);
        setIsGameStarted(false);
      } else if (player2Choice !== null) {
        setWinner(player2Choice, choice);
        ready.current = true;
        setIsGameStarted(false);
      }
    } else if (player === 2) {
      setPlayer2Choice(choice);
      if (player1Choice !== null) {
        setWinner(player1Choice, choice);
        ready.current = true;
        setIsGameStarted(false);
      }
    }
  };

  const aiChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const setWinner = (choice1: string | null, choice2: string | null) => {
    if (!choice1 || !choice2) return;

    if (choice1 === choice2) {
      setResult("Empate");
    } else if (winningConditions[choice1].includes(choice2)) {
      setResult("Gana jugador 1");
    } else {
      setResult("Gana jugador 2");
    }
  };

  const reset = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setResult("");
    setIsGameStarted(false);
    setSinglePlayer(false);
    ready.current = false;
  };

  const renderChoiceIcon = (choice: string | null, isPlayer1: boolean) => {
  if (player1Choice !== null && player2Choice !== null && choice !== null) {
    const IconComponent = choiceIcons[choice];
    const rotateClass = isPlayer1
      ? choice === "scissors" || choice === "lizard"
        ? style.mirror
        : style.rotateRight
      : choice === "scissors" || choice === "lizard"
      ? ""
      : style.rotateLeft;
    return <IconComponent className={`${style.hand} ${rotateClass}`} />;
  } else return <RxQuestionMarkCircled className={style.hand} />;
};

  return (
    <div className={`${style.container} flex column align center`}>
      <h1 className={style.title}>Piedra, Papel, Tijeras, Lagarto, Spock</h1>
      <div className={style.innerContainer + " " + "flex center align evenly"}>
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
              className={player1Choice == null && ready.current ? `${style.button} flex align center` : `${style.button} ${style.disabled} flex align center`}
              onClick={
                isGameStarted && player1Choice == null ? () => playersChoice(choice, 1) : undefined
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
              className={player2Choice == null && ready.current ? `${style.button} flex align center` : `${style.button} ${style.disabled} flex align center`}
              onClick={
                isGameStarted && player2Choice == null ? () => playersChoice(choice, 2) : undefined
              }
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
      <div
        className={style.buttonsContainer + " " + "flex center align around"}
      >
        {isGameStarted ? (
          <GenericButton text="Reiniciar" func={reset} />
        ) : (
          <>
            <GenericButton text="1 jugador" func={() => start(1)} />
            <GenericButton text="2 jugadores" func={() => start(2)} />
          </>
        )}
      </div>
    </div>
  );
};

export default RockPaperScissorsLizardSpock;
