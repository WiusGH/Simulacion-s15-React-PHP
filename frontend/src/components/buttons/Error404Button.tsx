import "./HeaderButton.css";

const error404Button = ({ text }: { text: string }) => {
  return <div className="flex align generic-button">{text}</div>;
};

export default error404Button;
