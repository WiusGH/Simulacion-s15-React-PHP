import { useRef, useState, useEffect } from "react";
import style from "./Connect4.module.css";

// Valores para mostrar el ganador o empate
type Winner = null | "red" | "yellow" | "tie";

const Connect4 = () => {
  const [board, setBoard] = useState(Array.from({ length: 7 }, () => Array(6).fill(null)));// Crea una matriz para manejar las fichas en el tablero
  const [isPlayer1, setIsPlayer1] = useState(true); // Indica si es el turno del jugador 1 o 2
  const singlePlayer = useRef(false); // Indica si el juego es de un solo jugador
  const [winner, setWinner] = useState<Winner>(null); // Indica el ganador
  const [gameStarted, setGameStarted] = useState(false); // Indica si el juego ha comenzado
  const [count, setCount] = useState(0); // Cuenta el número de jugadas para saber si el tablero está lleno y no hay ganador

  // Comienza el juego y se asegura de reiniciar el tablero
  const start = (players: number) => {
    setGameStarted(true);
    setBoard(Array.from({ length: 7 }, () => Array(6).fill(null)));
    setIsPlayer1(true);
    setWinner(null);
    setCount(0);
    // Detecta si es un solo jugador
    if (players === 1) {
      singlePlayer.current = true;
    }
  };

  // Coloca una ficha dependiendo de la columna seleccionada
  const handleClick = (column: number) => {
    if (!gameStarted || winner) return; // Verifica que el juego esté inicializado y que no haya ganador
    const newBoard = board.map(row => row.slice()); // Copia el tablero actual
    let moveMade = false; // Evita que se coloquen fichas demás en cada turno
    // Busca el primer espacio vacío en la columna
    for (let row = 5; row >= 0; row--) {
      if (newBoard[column][row] === null) {
        newBoard[column][row] = isPlayer1 ? "yellow" : "red";
        setBoard(newBoard);
        checkWinner(newBoard);
        if (winner) return;
        setCount(count + 1);
        moveMade = true;
        break;
      }
    }
    if (moveMade) {
      setIsPlayer1(prevIsPlayer1 => {
        return !prevIsPlayer1;
      });
    }
  };
  // Asegura que se actualice la variable "isPlayer1" para ejecutar el algoritmo de la IA
  useEffect(() => {
    if (!isPlayer1 && singlePlayer.current) {
      setTimeout(aiMove, 500); // Leve retraso para simular el pensamiento de la IA
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlayer1]);

  const aiMove = () => {
    // Hace que la primera jugada de la IA sea aleatoria
    if (count < 2) {
      handleClick(Math.floor(Math.random() * 7));
      return;
    }
    const newBoard = board.map(row => row.slice());
    // Verifica si la IA puede ganar en el siguiente turno
    for (let col = 0; col < 7; col++) {
      for (let row = 5; row >= 0; row--) {
        if (newBoard[col][row] === null) {
          newBoard[col][row] = "red";
          if (checkPotentialWin(newBoard, "red")) {
            setBoard(newBoard);
            handleClick(col);
            return;
          }
          newBoard[col][row] = null;
          break;
        }
      }
    }
    // Verifica si el jugador puede ganar en el siguiente turno e intenta bloquearlo
    for (let col = 0; col < 7; col++) {
      for (let row = 5; row >= 0; row--) {
        if (newBoard[col][row] === null) {
          newBoard[col][row] = "yellow";
          if (checkPotentialWin(newBoard, "yellow")) {
            newBoard[col][row] = null;
            setBoard(newBoard);
            handleClick(col);
            return;
          }
          newBoard[col][row] = null;
          break;
        }
      }
    }
  
    // Prioritiza columnas en donde la IA pueda conectar 3 discos
    const priorities = [3, 2, 4, 1, 5, 0, 6]; // Prioritiza las columnas del centro
    for (const col of priorities) {
      for (let row = 5; row >= 0; row--) {
        if (newBoard[col][row] === null) {
          newBoard[col][row] = "red";
          if (checkPotentialWin(newBoard, "red")) {
            setBoard(newBoard);
            handleClick(col);
            return;
          }
          newBoard[col][row] = null;
          break;
        }
      }
    }
    // Hace una jugada aleatoria si no encuentra una jugada estratégica
    let randomCol;
    do {
      randomCol = Math.floor(Math.random() * 7);
    } while (newBoard[randomCol][0] !== null);
    
    setBoard(newBoard);
    handleClick(randomCol);
  };
  
  // Función reservada para la IA para verificar si puede ganar
  const checkPotentialWin = (board: string[][], player: "red" | "yellow") => {
    const rows = 6;
    const cols = 7;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (board[col][row] === player) {
          if (
            col + 3 < cols &&
            board[col + 1][row] === player &&
            board[col + 2][row] === player &&
            board[col + 3][row] === player
          ) {
            return true;
          }
          if (
            row + 3 < rows &&
            board[col][row + 1] === player &&
            board[col][row + 2] === player &&
            board[col][row + 3] === player
          ) {
            return true;
          }
          if (
            col + 3 < cols &&
            row + 3 < rows &&
            board[col + 1][row + 1] === player &&
            board[col + 2][row + 2] === player &&
            board[col + 3][row + 3] === player
          ) {
            return true;
          }
          if (
            col - 3 >= 0 &&
            row + 3 < rows &&
            board[col - 1][row + 1] === player &&
            board[col - 2][row + 2] === player &&
            board[col - 3][row + 3] === player
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };
  
  // Función para verificar si hay un ganador o empate si está lleno el tablero
  const checkWinner = (board: string[][]) => {
    const rows = 6;
    const cols = 7;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const color = board[col][row];
  
        if (color) {
          if (col + 3 < cols &&
              board[col + 1][row] === color &&
              board[col + 2][row] === color &&
              board[col + 3][row] === color) {
            setWinner(color as "red" | "yellow");
            return;
          }
          if (row + 3 < rows &&
              board[col][row + 1] === color &&
              board[col][row + 2] === color &&
              board[col][row + 3] === color) {
            setWinner(color as "red" | "yellow");
            return;
          }
          if (col + 3 < cols && row + 3 < rows &&
              board[col + 1][row + 1] === color &&
              board[col + 2][row + 2] === color &&
              board[col + 3][row + 3] === color) {
            setWinner(color as "red" | "yellow");
            return;
          }
          if (col - 3 >= 0 && row + 3 < rows &&
              board[col - 1][row + 1] === color &&
              board[col - 2][row + 2] === color &&
              board[col - 3][row + 3] === color) {
            setWinner(color as "red" | "yellow");
            return;
          }
          if (count === 42) {
            setWinner("tie");
            return;
          }
        }
      }
    }
  };
  
  // Resetea todos los parámetros para permiti iniciar un nuevo juego
  const reset = () => {
    setGameStarted(false);
    setBoard(Array.from({ length: 7 }, () => Array(6).fill(null)));
    setWinner(null);
    setIsPlayer1(true);
    setCount(0);
    singlePlayer.current = false;
  };

  return (
    <div className={style.container}>
      <div className={style.board}>
        {board.map((column, colIndex) => (
          <div
            key={colIndex}
            className={gameStarted ? `${style.boardcolumn} ${!isPlayer1 && singlePlayer.current ? null : style.selection}` : style.boardcolumn}
            onClick={!gameStarted || (singlePlayer.current && !isPlayer1) ? undefined : () => handleClick(colIndex)}

          >
            {column.map((cell, rowIndex) => (
              <div key={rowIndex} className={style.space} style={{ backgroundColor: cell }}>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={style.buttons}>
        {gameStarted ? (
          <>
            <div className={style.c4button + " " + "flex align"}>
              Turno del {isPlayer1 ? <div className={style.yellow}></div> : <div className={style.red}></div>}
            </div>
            <div className={style.c4button} onClick={reset}>Reiniciar</div>
          </>
        ) : (
          <>
            <div className={style.c4button} onClick={() => start(1)}>1 jugador</div>
            <div className={style.c4button} onClick={() => start(2)}>2 jugadores</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Connect4;
