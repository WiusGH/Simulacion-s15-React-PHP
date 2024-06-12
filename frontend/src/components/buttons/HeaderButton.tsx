//import style from "./HeaderButton.module.css";

const HeaderButton = ({
  text,
  icon,
  url,
}: {
  text: string;
  icon: React.ReactNode;
  url: string;
}) => {
  return (
    <a href={url}>
      <div className="flex">
        {icon}
        &nbsp;
        {text}
      </div>
    </a>
  );
};

export default HeaderButton;
