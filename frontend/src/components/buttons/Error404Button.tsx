import "./Error404Button.css";

const error404Button = ({ text }: { text: string }) => {
  return <div className="flex align error-404-button">{text}</div>;
};

export default error404Button;
