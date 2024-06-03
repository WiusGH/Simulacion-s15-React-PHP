import React, { useRef, useState } from "react";
import style from "./RockPaperScissorsLizardSpock.module.css";
import { FaHandRock, FaHandPaper, FaHandScissors, FaHandLizard, FaHandSpock } from 'react-icons/fa'
import qm from "../../../public/images/rpsls/qm.png";
import GenericButton from "../buttons/GenericButton";

const RockPaperScissorsLizardSpock = () => {
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [singlePlayer, setSinglePlayer] = useState(false);
  const [result, setResult] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const choices = ["rock", "paper", "scissors", "lizard", "spock"];
  const icons = [FaHandRock, FaHandPaper, FaHandScissors, FaHandLizard, FaHandSpock];
  const ready = useRef(false);

  const start = (players: number) => {
    setPlayer1Choice("");
    setPlayer2Choice("");
    setResult("");
    ready.current = false;
    setIsGameStarted(true);
    if (players === 1) {
      setSinglePlayer(true);
    }
  };

  const playersChoice = (choice: string, player: number) => {
    if (player === 1) {
      setPlayer1Choice(choice);
    } else if (player === 2) {
      setPlayer2Choice(choice);
      ready.current = true;
    }
    if (singlePlayer) {
      setPlayer2Choice(aiChoice());
      ready.current = true;
    }
  };

  const aiChoice = () => {
    const aiChoice = choices[Math.floor(Math.random() * choices.length)];
    return aiChoice;
  };

  const reset = () => {
    setPlayer1Choice("");
    setPlayer2Choice("");
    setResult("");
    setIsGameStarted(false);
    setSinglePlayer(false);
    ready.current = false;
  };

  return (
    <div className={style.container + " " + "flex column align center"}>
      <h1 className={style.title}>Piedra, Papel, Tijeras, Lagarto, Spock</h1>
      <div className="flex center align around">
        <div>
          {player1Choice === "" ? <img className={style.img} src={qm} /> : null}
          {player1Choice && isGameStarted && (
                player1Choice === "rock"
                  ? <FaHandRock className={style.hand + " " + style.rotateRight} />
                  : player1Choice === "paper"
                  ? <FaHandPaper className={style.hand + " " + style.rotateRight} />
                  : player1Choice === "scissors"
                  ? <FaHandScissors className={style.hand + " " + style.mirror} />
                  : player1Choice === "lizard"
                  ? <FaHandLizard className={style.hand + " " + style.mirror} />
                  : player1Choice === "spock"
                  ? <FaHandSpock className={style.hand + " " + style.rotateRight} />
                  : qm
          )}
        </div>
        <div>VS.</div>
        <div>
          {player2Choice === "" ? <img className={style.img} src={qm} /> : null}
          {player2Choice && isGameStarted && (
                player2Choice === "rock"
                  ? <FaHandRock className={style.hand + " " + style.rotateLeft} />
                  : player2Choice === "paper"
                  ? <FaHandPaper className={style.hand + " " + style.rotateLeft} />
                  : player2Choice === "scissors"
                  ? <FaHandScissors className={style.hand} />
                  : player2Choice === "lizard"
                  ? <FaHandLizard className={style.hand} />
                  : player2Choice === "spock"
                  ? <FaHandSpock className={style.hand + " " + style.rotateLeft} />
                  : qm
          )}
        </div>
      </div>
      <div className="flex">
        <div className={isGameStarted ? "flex" : style.dimmed + " " + "flex"}>
          {choices.map((choice, index) => (
            <button className={style.button + " " + "flex align center" } key={index} onClick={() => playersChoice(choice, 1)}>{choice}</button >
          ))}
        </div>
        <div className="flex">
        {choices.map((choice, index) => (
            <button className={style.button + " " + "flex align center" } key={index} onClick={() => playersChoice(choice, 2)}>{choice}</button >
          ))}
        </div>
      </div>
      <div className="flex evenly">
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
