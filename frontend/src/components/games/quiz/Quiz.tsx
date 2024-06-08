import { useEffect, useState } from "react";
import quiz from "./data/questions.json";
import Category from "./Category";
import { ICategory } from "./types";

const Quiz = () => {
  const initialCategory = {
    id: 0,
    categoryName: "",
    questions: [],
  };

  const [category, setCategory] = useState<ICategory>(initialCategory);
  const [countCategory, setCountCategory] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [messageFinalCategory, setMessageFinalCategory] = useState(false);
  const [score, setScore] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const [messageFinish, setMessageFinish] = useState(false);

  const FIRSTCATEGORY = 1;
  const LASTCATEGORY = quiz.categories.length;

  useEffect(() => {
    if (countCategory === LASTCATEGORY) {
      setGameOver(true);
    }

    if (countCategory === LASTCATEGORY - 1) {
      setMessageFinalCategory(true);
    }
  }, [countCategory]);

  const handleGetCategory = (id: number) => {
    const getCategory = quiz.categories[id - 1];
    setIsDisable(true);

    setCategory(getCategory);
  };

  const handleNextCategory = (id: number) => {
    const nextCategory = id + 1;

    if (nextCategory <= LASTCATEGORY) {
      return handleGetCategory(nextCategory);
    }

    handleGetCategory(FIRSTCATEGORY);
  };

  const handleReset = () => {
    setIsDisable(false);
    setMessageFinish(false);
    setScore(0);
    setCategory(initialCategory);
    setCountCategory(1);
    setGameOver(false);
    setMessageFinalCategory(false);
  };

  return (
    <section className="w-full h-[750px] lg:w-2/3">
      <article className="flex flex-col justify-evenly items-center">
        <h2 className="font-bold text-2xl my-2 text tracking-wider">
          Bienvenido
        </h2>
        <h3 className="font-bold text-xl mb-2 tracking-wider">Al Juego Quiz</h3>

        <h3 className="font-bold text-lg mb-2 tracking-wider">
          Selecciona la categoría
        </h3>

        <div className="w-full h-56 flex justify-evenly items-center flex-wrap">
          {quiz.categories.map((category) => (
            <button
              className="w-[200px] h-[48px] px-4 py-2 bg-[#4f1b83] text-white rounded tracking-widest hover:bg-[#b58ae0] hover:text-[#110d1b] ease-in duration-300"
              disabled={isDisable ? true : false}
              key={category.id}
              onClick={() => handleGetCategory(category.id)}>
              {category.categoryName}
            </button>
          ))}

          {messageFinish && (
            <button
              className="w-[200px] h-[48px] px-4 py-2 bg-[#8235D0] text-white rounded tracking-widest hover:bg-[#4f1b83] hover:text-[#CFB3EA] ease-in duration-300"
              onClick={handleReset}>
              Reiniciar
            </button>
          )}
        </div>
      </article>

      <article>
        {!messageFinish && (
          <>
            <Category
              category={category}
              handleNextCategory={handleNextCategory}
              setCountCategory={setCountCategory}
              setScore={setScore}
              messageFinalCategory={messageFinalCategory}
              setMessageFinish={setMessageFinish}
              gameOver={gameOver}
            />
          </>
        )}
      </article>

      {messageFinish && (
        <div className="text-center my-3">
          <h3 className="font-bold text-xl mb-2 tracking-widest text-[#1C0830]">
            Felicitaciones tú record es de
            <span className="text-2xl px-3 text-[#8235D0]">{score}</span>
          </h3>
        </div>
      )}
    </section>
  );
};
export default Quiz;
