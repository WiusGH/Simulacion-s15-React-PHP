import { useState } from "react";
import "./Simon.css";

const Simon = () => {
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [userInputs, setUserInputs] = useState<number[]>([]);
  const [counter, setCounter] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [userInputEnabled, setUserInputEnabled] = useState(false);

  const delay = (ms: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  };

  const start = async () => {
    if (!gameStarted) {
      setGameStarted(true);
      setSelectedColors([]);
      setUserInputs([]);
      setCounter(0);
      await playSequence();
    } else {
      setGameStarted(false);
      setSelectedColors([]);
      setUserInputs([]);
      setCounter(0);
    }
  };

  const playSequence = async () => {
    setCounter((prevCounter) => prevCounter + 1);
    const randomSelector = Math.ceil(Math.random() * 4);
    setSelectedColors((prevSelectedColors) => [...prevSelectedColors, randomSelector]);
    for (let i = 0; i < selectedColors.length; i++) {
      await delay(600);
    }
    setUserInputEnabled(true); // Enable user input after the sequence is played
  };


  const handleUserInput = async (clickedColor: number) => {
    setUserInputs((prevUserInputs) => [...prevUserInputs, clickedColor]);
    const clickedColorId = document.getElementById(clickedColor.toString());
    if (clickedColorId) {
      clickedColorId.style.outline = "2px solid white";
      await delay(100);
      clickedColorId.style.outline = "none";
    }
    if (clickedColor !== selectedColors[userInputs.length - 1]) {
      alert("Wrong! Game over.");
      resetGame();
    } else {
      if (userInputs.length === selectedColors.length) {
        setUserInputs([]);
        setCounter((prevCounter) => prevCounter + 1);
        setUserInputEnabled(false); // Disable user input after the correct sequence is completed
        setTimeout(playSequence, 1000);
      }
    }
  };


  const resetGame = () => {
    setSelectedColors([]);
    setUserInputs([]);
    setCounter(0);
    setGameStarted(false);
    userInputEnabled && setUserInputEnabled(false);
  };

  return (
    <div className="flex column align">
      <div className="counter" id="counter">
        {counter}
      </div>
      <div className="container">
        <div className="row">
          <div className="item yellow" id="1" onClick={() => handleUserInput(1)}></div>
          <div className="item red" id="2" onClick={() => handleUserInput(2)}></div>
        </div>
        <div className="row">
          <div className="item green" id="3" onClick={() => handleUserInput(3)}></div>
          <div className="item blue" id="4" onClick={() => handleUserInput(4)}></div>
        </div>
      </div>
      <div className="button" id="start-button" onClick={start}>
        {gameStarted ? "Stop" : "Start"}
      </div>
    </div>
  );
};

export default Simon;
