import { useState, useEffect } from "react";
import { RiInformation2Line } from "react-icons/ri";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import InfoGameButton from "../buttons/InfoGameButton";
import style from "./SideBar.module.css";

const SideBar = ({ game }: { game: string }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {}, [expanded]);

  return (
    <div className={`${style.sidebar} ${expanded ? style.expanded + " " + "flex column center align": "flex column center align"}`}>
      <div className={style.sidebarHandle} onClick={toggleSidebar}>
        <span>
          {expanded ? <FaCircleArrowRight size={24} /> : <FaCircleArrowLeft size={24} />}
        </span>
      </div>
      <div className={style.sidebarContent}>
        <InfoGameButton
          text="Info"
          icon={<RiInformation2Line />}
          nameGame={game}
        />
      </div>
    </div>
  );
};

export default SideBar;
