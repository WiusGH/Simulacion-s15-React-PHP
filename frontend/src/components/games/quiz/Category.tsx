import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ICategory } from "./types";

interface Props {
  category: ICategory;
  handleNextCategory: (id: number) => void;
  setCountCategory: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setMessageFinish: React.Dispatch<React.SetStateAction<boolean>>;
  messageFinalCategory: boolean;
  gameOver: boolean;
}

const Category = ({
  category,
  handleNextCategory,
  setCountCategory,
  setScore,
  setMessageFinish,
  messageFinalCategory,
  gameOver,
}: Props) => {
  const { id, categoryName, questions } = category;

  const [nextQuestion, setNextQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [endQuestions, setEndQuestions] = useState(false);

  const handleNextQuestion = (answer: string) => {
    const ALLQUESTIONS = category?.questions?.length - 1;
    const CORRECT_ANSWER = category?.questions[nextQuestion]?.answer;

    const SELECT_ANSWER = answer[0];

    setNextQuestion((prev) => prev + 1);

    if (nextQuestion >= ALLQUESTIONS) {
      setEndQuestions(true);
    }

    if (SELECT_ANSWER === CORRECT_ANSWER) {
      setCorrectAnswer((prev) => prev + 1);
      setScore((prev) => prev + 20);
    }
  };

  useEffect(() => {
    if (endQuestions) {
      if (correctAnswer <= 2) {
        Swal.fire({
          title: "Opss...",
          text: `Número de aciertos ${correctAnswer}`,
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Volver a jugar",
        }).then((result) => {
          if (result.isConfirmed) {
            setScore(0);
            handleNextCategory(id - 1);
          } else {
            setMessageFinish(true);
          }
        });
      }

      if (correctAnswer > 2) {
        if (gameOver) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Felicidades terminaste todas las categorías",
            showConfirmButton: false,
            timer: 2000,
          });
          setMessageFinish(true);
        } else {
          Swal.fire({
            title: `¡Muy bien! ${correctAnswer} aciertos `,
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `${
              messageFinalCategory ? "Última categoría" : "Siguiente categoría"
            }`,
          }).then((result) => {
            if (result.isConfirmed) {
              setCountCategory((prev) => prev + 1);
              handleNextCategory(id);
            } else {
              setMessageFinish(true);
            }
          });
        }
      }
      setNextQuestion(0);
      setCorrectAnswer(0);
      setEndQuestions(false);
    }
  }, [endQuestions]);

  return (
    <>
      <h2 className="text-center text-xl  tracking-wider">{categoryName}</h2>
      <p className="text-center text-xl tracking-wider font-mono">
        {questions[nextQuestion]?.questionName}
      </p>

      <div className="w-full h-[300px] flex flex-col items-center justify-evenly lg:flex-row lg:h-28">
        {questions[nextQuestion]?.options.map((option) => (
          <button
            key={option}
            className="w-44 h-14 px-4 py-2 bg-[#8235D0] text-white rounded tracking-widest font-mono"
            onClick={() => handleNextQuestion(option)}>
            {option}
          </button>
        ))}
      </div>
    </>
  );
};
export default Category;
