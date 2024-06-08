import React from "react";
import style from "./Title.module.css";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return <p className={style.title}>{text}</p>;
};

export default Title;
