import style from "./HeaderButton.module.css";

const HeaderButton = ({
  text,
  icon,
}: {
  text: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className={style.headerButton}>
      {icon}
      &nbsp;
      {text}
    </div>
  );
};

export default HeaderButton;
