import React, { useRef, useState } from "react";
import style from "./Connect4.module.css";

type Winner = null | "red" | "yellow";

const Connect4 = () => {
  const [board, setBoard] = useState(Array.from({ length: 7 }, () => Array(6).fill(null)));
  const [isPlayer1, setIsPlayer1] = useState(true);
  const [winner, setWinner] = useState<Winner>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [count, setCount] = useState(0);

  const start = (players: number) => {
    setGameStarted(true);
    setBoard(Array.from({ length: 7 }, () => Array(6).fill(null)));
    setIsPlayer1(true);
    setWinner(null);
  };

  const handleClick = (column: number) => {
    if (!gameStarted || winner) return;
    const newBoard = board.map(row => row.slice());
    for (let row = 5; row >= 0; row--) {
      if (newBoard[column][row] === null) {
        newBoard[column][row] = isPlayer1 ? "yellow" : "red";
        setBoard(newBoard);
        setIsPlayer1(!isPlayer1);
        checkWinner(newBoard);
        console.log(newBoard);
        setCount(count + 1);
        return;
      }
    }
  };

  const checkWinner = (board: string[][]) => {
    const rows = 6;
    const cols = 7;
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const player = board[col][row];
  
        if (player) {
          // Check horizontal
          if (col + 3 < cols &&
              board[col + 1][row] === player &&
              board[col + 2][row] === player &&
              board[col + 3][row] === player) {
            setWinner(player as "red" | "yellow");
            console.log("Winner: " + player);
            return;
          }
  
          // Check vertical
          if (row + 3 < rows &&
              board[col][row + 1] === player &&
              board[col][row + 2] === player &&
              board[col][row + 3] === player) {
            setWinner(player as "red" | "yellow");
            console.log("Winner: " + player);
            return;
          }
  
          // Check diagonal (bottom right)
          if (col + 3 < cols && row + 3 < rows &&
              board[col + 1][row + 1] === player &&
              board[col + 2][row + 2] === player &&
              board[col + 3][row + 3] === player) {
            setWinner(player as "red" | "yellow");
            console.log("Winner: " + player);
            return;
          }
  
          // Check diagonal (bottom left)
          if (col - 3 >= 0 && row + 3 < rows &&
              board[col - 1][row + 1] === player &&
              board[col - 2][row + 2] === player &&
              board[col - 3][row + 3] === player) {
            setWinner(player as "red" | "yellow");
            console.log("Winner: " + player);
            return;
          }
        }
      }
    }
  };
  

  // else if (
  //   board[col][row] === "red" &&
  //   board[col][row + 1] === "red" &&
  //   board[col][row + 2] === "red" &&
  //   board[col][row + 3] === "red"
  // ) {
  //   setWinner("red");
  //   console.log("Winner: " + winner);
  //   return;
  // }

  const reset = () => {
    setGameStarted(false);
    setBoard(Array.from({ length: 7 }, () => Array(6).fill(null)));
    setWinner(null);
    setIsPlayer1(true);
  };


  // TODO: Detectar cuando la tabla esté llena
  // TODO: Detectar 4 colores horizontal, vertical o diagonalmente
  // TODO: Agregar IA para jugar solo
  return (
    <div className={style.container}>
      <div className={style.board}>
        {board.map((column, colIndex) => (
          <div
            key={colIndex}
            className={gameStarted ? `${style.boardcolumn} ${style.selection}` : style.boardcolumn}
            onClick={() => handleClick(colIndex)}
          >
            {column.map((cell, rowIndex) => (
              <div key={rowIndex} className={style.space} style={{ backgroundColor: cell }}>
                {/* Display the disc color */}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={style.buttons}>
        {gameStarted ? (
          <div className="c4button" onClick={reset}>Reiniciar</div>
        ) : (
          <>
            <div className="c4button" onClick={() => start(1)}>1 jugador</div>
            <div className="c4button" onClick={() => start(2)}>2 jugadores</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Connect4;
