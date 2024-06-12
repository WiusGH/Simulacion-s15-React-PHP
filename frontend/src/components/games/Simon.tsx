import { useState, useRef } from "react";
import style from "./Simon.module.css";
import beep1 from '../../../public/sounds/simon/beep1.flac';
import beep2 from '../../../public/sounds/simon/beep2.wav';
import beep3 from '../../../public/sounds/simon/beep3.wav';
import beep4 from '../../../public/sounds/simon/beep4.wav';
import gameStart from '../../../public/sounds/simon/game-start.wav';
import gameOver from '../../../public/sounds/simon/game-over.wav';
import GenericButton from "../buttons/GenericButton";

const Simon = () => {
  const [selectedColors, setSelectedColors] = useState<number[]>([]); // Contador de colores generador aleatoriamente
  const [userInputs, setUserInputs] = useState<number[]>([]); // Contador de colores introducidos por el usuario
  const [counter, setCounter] = useState(0); // Contador de secuencias
  const [gameStarted, setGameStarted] = useState(false); // Booleano para iniciar o parar el juego
  const [userInputEnabled, setUserInputEnabled] = useState(false); // Booleano para habilitar o deshabilitar el input del usuario
  const isPlayingSequence = useRef(false); // Booleano para evitar que se repita la secuencia
  const resetRequested = useRef(false); // Booleano para asegurar que se detenga la secuencia al resetear el juego

  //wis, esta linea me sale que no esta siendo usada, la muestro asi para que el deploy no me de errores. 
  console.log(userInputs);

  const delay = (ms: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, ms)); // Función de retraso personalizada
  };

  const colorSounds: { [key: number]: HTMLAudioElement } = {
    1: new Audio(beep1.toString()),
    2: new Audio(beep2.toString()),
    3: new Audio(beep3.toString()),
    4: new Audio(beep4.toString()),
  };
  const loseSound = new Audio(gameOver.toString());
  const startSound = new Audio(gameStart.toString());

  const playSound = (color: number) => {
    if (userInputEnabled) {
      colorSounds[color].play();
    }
  };

  // Función para iniciar el juego
  const start = async () => {
    if (!gameStarted) {
      // Resetea todos los contadores a 0
      startSound.play();
      setGameStarted(true);
      setSelectedColors([]);
      setUserInputs([]);
      setCounter(0);
      await delay(1000);
      await addColorToSequence();
    } else {
      resetGame();
    }
  };

  // Agrega un color nuevo aleatorio a la secuencia y reproduce la secuencia
  const addColorToSequence = async () => {
    if (isPlayingSequence.current) return; // Verifica que no se este reproduciendo una secuencia y evita repeciones
    isPlayingSequence.current = true; // Indica que se esta reproduciendo una secuencia
    resetRequested.current = false;
    const newColor = Math.ceil(Math.random() * 4);
    const newSequence = [...selectedColors, newColor]; // Agrega el nuevo color a la secuencia
    setSelectedColors(newSequence); 
    setUserInputEnabled(false); // Deshabilita el input del usuario para evitar entorpecer la secuencia de juego
    await playSequence(newSequence);
    setUserInputEnabled(true); // Habilita el input del usuario una vez terminada la secuencia
  };

  // Reproduce una secuencia de colores
  const playSequence = async (sequence: number[]) => {
    setCounter((prevCounter) => prevCounter + 1); // Aumenta el contador en 1
    for (let i = 0; i < sequence.length; i++) {
      if (resetRequested.current) { // Si se ha solicitado resetear la secuencia, detiene la secuencia y sale de la función
        isPlayingSequence.current = false;
        return;
      }
      playSound(sequence[i]); // Reproduce el sonido correspondiente al color
      const colorId = sequence[i].toString(); // Obtiene el ID del color correspondiente
      const colorElement = document.getElementById(colorId); // Obtiene el elemento HTML del color correspondiente
      if (colorElement) {
        colorElement.style.outline = "2px solid white"; // Agrega un borde temporal para indicar visualmente el color seleccionado
        await delay(600);
        colorElement.style.outline = "none"; // Elimina el borde temporal y pausa temporalmente la ejecución antes de mostrar el siguiente color
        await delay(200);
      }
    }
    isPlayingSequence.current = false; // Indica que ya no se esta reproduciendo una secuencia
  };

  // Agrega colores seleccionados a la lista de inputs del usuario
  const handleUserInput = async (clickedColor: number) => { // Recibe el color seleccionado por el usuario
    playSound(clickedColor); // Reproduce el sonido correspondiente al color
    if (!userInputEnabled) return; // Verifica que esté habilitado el input del usuario
    setUserInputs((prevUserInputs) => {
      const newInputs = [...prevUserInputs, clickedColor]; // Crea una lista nuevo con los inputs anteriores y el nuevo input
      const clickedColorId = document.getElementById(clickedColor.toString());
      if (clickedColorId) {
        clickedColorId.style.outline = "2px solid white"; // Agregar un borde temporal para indicar al usuario la selección de color
        delay(100).then(() => (clickedColorId.style.outline = "none"));
      }
      const isCorrect = newInputs.every((color, index) => color === selectedColors[index]); // Verifica que el input actual corresponda a la secuencia de colores
      if (!isCorrect) {
        loseSound.play();
        document.body.style.backgroundColor = "red"; // Cambia temporalmente el fondo a rojo para indicarle al usuario que ha fallado
        delay(200).then(() => (document.body.style.backgroundColor = "white"));
        resetGame();
      } else if (newInputs.length === selectedColors.length) { // Detecta cuando la cantidad de inputs es igual a la cantidad actual de colores selecionados
        setUserInputs([]); // Resetea los inputs del usuario para la siguiente ronda
        setUserInputEnabled(false); // Deshabilita temporalmente el input del usuario para permitir una nueva secuencia sin interrupciones
        delay(1000).then(() => addColorToSequence());
      }
      return newInputs;
    });
  };

  // Resetea todos los parámetros para permiti iniciar un nuevo juego
  const resetGame = () => {
    resetRequested.current = true;
    setSelectedColors([]);
    setUserInputs([]);
    setCounter(0);
    setGameStarted(false);
    setUserInputEnabled(false);
    isPlayingSequence.current = false;
  };

  // TODO: implementar un contador temporal para indicar el puntaje máximo de la sesión actual
  // TODO: implementar el envío del puntaje máximo al backend al fallar o resetar el juego
  // TODO: obtener el puntaje máximo guardado en el backend y mostrarlo al cargar el juego
  // FIX: reajustar el tamaño para que quepa cómodamente en pantallas más pequeñas

  return (
    <div className={`${style.container} flex align column`}>
      <div className={style.counter} id="counter">
        {counter}
      </div>
      <div className={style.innerContainer}>
        <div className={style.row}>
          <div className={gameStarted ? `${style.item} ${style.red} pointer` : `${style.item} ${style.red}`} id="1" onClick={() => handleUserInput(1)}></div>
          <div className={gameStarted ? `${style.item} ${style.blue} pointer` : `${style.item} ${style.blue}`} id="2" onClick={() => handleUserInput(2)}></div>
        </div>
        <div className={style.row}>
          <div className={gameStarted ? `${style.item} ${style.green} pointer` : `${style.item} ${style.green}`} id="3" onClick={() => handleUserInput(3)}></div>
          <div className={gameStarted ? `${style.item} ${style.yellow} pointer` : `${style.item} ${style.yellow}`} id="4" onClick={() => handleUserInput(4)}></div>
        </div>
      </div>
      <div className={style.button} id="start-button" onClick={start}>
        {gameStarted ? "Detener" : "Iniciar"}
      </div>
    </div>
  );
};

export default Simon;
