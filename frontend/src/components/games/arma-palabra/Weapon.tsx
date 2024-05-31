import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

interface Word {
  id: number;
  word: string;
}

const Weapon = () => {
  const initialWords: Word[] = [
    {
      id: 1,
      word: "monedas",
    },
    {
      id: 2,
      word: "minutos",
    },
    {
      id: 3,
      word: "ventanas",
    },
    {
      id: 4,
      word: "caramelos",
    },
    {
      id: 5,
      word: "familia",
    },
  ];

  const TIME = 30;

  const [words] = useState<Word[]>(initialWords);
  const [count, setCount] = useState<number>(0);
  const [newWord, setNewWord] = useState<string[]>([]);
  const [nextWord, setNextWord] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(TIME);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [record, setRecord] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [startIndex] = useState(Math.floor(Math.random() * words.length));

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setGameOver(true);
      setCount(0);
      setIsRunning(false);
      setNextWord("");
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, timeLeft]);

  const startGame = () => {
    if (count >= words.length) {
      setGameOver(true);
      setIsRunning(false);
      setCount(0);
      return;
    }

    if (gameOver) {
      setRecord(0);
    }

    const currentIndex = (startIndex + count) % words.length;
    const mess = words[currentIndex].word
      .toUpperCase()
      .split("")
      .sort(() => Math.random() - 0.5);
    setNewWord(mess);
    setCount((prev) => prev + 1);
    setTimeLeft(TIME);
    setIsRunning(true);
    setGameOver(false);
  };

  const handleIputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNextWord(e.target.value);
  };

  const handleNextWord = () => {
    const currentIndex = (startIndex + count - 1) % words.length;
    if (nextWord === words[currentIndex].word) {
      setNextWord("");
      inputRef.current?.focus();
      setRecord((prev) => prev + 20);
      setTimeLeft(TIME);
      startGame();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Palabra Correcta ✅",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Palabra Incorrecta",
        showConfirmButton: false,
        timer: 1500,
      });
      inputRef.current?.focus();
    }
  };

  return (
    <section className="w-full h-screen">
      <article className="flex flex-col justify-evenly items-center">
        <h2 className="font-bold text-2xl my-2 text tracking-wider">
          Bienvenido
        </h2>
        <h3 className="font-bold text-xl mb-2 tracking-wider">
          Al Juego Arma la Palabra
        </h3>

        {/*<div className="w-2/5 bg-pink-100">
          <h3>Instrucciones:</h3>
          <p>
            El objetivo del juego es reordenar una palabra en un tiempo límite
            de 30 segundos. El juego consta de un total de cinco palabras. Cada
            palabra correctamente ordenada otorga 20 puntos, y la puntuación
            máxima posible es de 100 puntos.
          </p>
        </div>*/}

        <button
          className="w-[256px] h-[48px] px-4 py-2 bg-[#4f1b83] text-white rounded tracking-widest hover:bg-[#b58ae0] hover:text-[#110d1b] ease-in duration-300"
          onClick={startGame}>
          Comienza
        </button>

        {isRunning && (
          <>
            <div className="text-4xl font-bold tracking-widest">
              {timeLeft} segundos
            </div>
            <p>¿Qué palabra es?</p>

            <div className="w-full h-20 bg-[#b58ae0] flex justify-evenly items-center lg:w-2/3">
              {newWord.map((word, index) => (
                <div
                  key={index}
                  className="w-9 h-9 font-bold text-xl grid place-content-center bg-white lg:w-14 lg:h-14">
                  {word}
                </div>
              ))}
            </div>

            <div className="h-28 flex flex-col justify-evenly items-center">
              <label
                htmlFor="word"
                className=" h-11 relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <input
                  type="text"
                  id="word"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-center py-3 uppercase"
                  value={nextWord}
                  placeholder="Escribe la palabra"
                  onChange={(e) => handleIputValue(e)}
                  ref={inputRef}
                  autoFocus
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Escribe la palabra
                </span>
              </label>

              <button
                className="w-[256px] h-[48px] px-4 py-2 bg-[#4f1b83] text-white rounded tracking-widest hover:bg-[#b58ae0] hover:text-[#110d1b] ease-in duration-300"
                onClick={handleNextWord}>
                Verificar
              </button>
            </div>
          </>
        )}
        {gameOver && (
          <>
            <p> Juego Finalizado</p>
            <p> Tu record es de {record}</p>
          </>
        )}
      </article>
    </section>
  );
};
export default Weapon;
