import React, { useState, useRef } from "react";
import style from "./Connect4.module.css";
import GenericButton from "../buttons/GenericButton";

const Connect4 = () => {
  const [board, setBoard] = useState(Array(7).fill(Array(6).fill(null)));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  // const gameStart = (players: number) => {
  //   setGameStarted(true);
  //   if (players === 1) {
  //     // Agregar IA para jugar solo
  //   }
  // };

  const gameStart = () => {
    setGameStarted(true);
  };

  const gameReset = () => {
    setBoard(Array(7).fill(Array(6).fill(null)));
    setIsXNext(true);
    setWinner(null);
    setGameStarted(false);
  };

  // TODO: Agregar la lógica del juego	
    // Cambiar colores al hacer click
    // Habilitar el juego al seleccionar el modo
    // Detectar cuando la tabla esté llena
  // TODO: Detectar 4 colores horizontal, vertical o diagonalmente
  // TODO: Agregar 2 colores, uno para cada jugador
  // TODO: Agregar IA para jugar solo
  return (
    <div className={style.container}>
      <div className={style.board}>
        <div className={style.boardcolumn}>
          <div className={gameStarted ? style.space + " " + style.selection : style.space}></div>
          <div className={gameStarted ? style.space + " " + style.selection : style.space}></div>
          <div className={gameStarted ? style.space + " " + style.selection : style.space}></div>
          <div className={gameStarted ? style.space + " " + style.selection : style.space}></div>
          <div className={gameStarted ? style.space + " " + style.selection : style.space}></div>
          <div className={gameStarted ? style.space + " " + style.selection : style.space}></div>
        </div>
        <div className={style.boardcolumn}>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
        </div>
        <div className={style.boardcolumn}>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
        </div>
        <div className={style.boardcolumn}>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
        </div>
        <div className={style.boardcolumn}>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
        </div>
        <div className={style.boardcolumn}>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
        </div>
        <div className={style.boardcolumn}>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
          <div className={style.space}></div>
        </div>
      </div>
      <div className={style.buttons}>
        <GenericButton text="1 jugador" func={gameStart} />
        <GenericButton text="2 jugadores" func={gameStart} />
      </div>
    </div>
  );
};

export default Connect4;
