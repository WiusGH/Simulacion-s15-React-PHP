import { useEffect } from "react";

interface Props {
  handleError: (error: boolean) => void;
  notFound: boolean;
}

const NotFound = ({ handleError, notFound }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleError(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [handleError, notFound]);

  return (
    <div className="py-4 m-auto bg-[#D03541]">
      <p className="text-center tracking-wider text-[#F4DCDE]">
        Juego no encontrado
      </p>
    </div>
  );
};
export default NotFound;
