import style from "./Error404Button.module.css";

const error404Button = ({ text }: { text: string }) => {
  return <div className={`${style.error404Button} + " " + ${style.button}`}>{text}</div>;
};

export default error404Button;
