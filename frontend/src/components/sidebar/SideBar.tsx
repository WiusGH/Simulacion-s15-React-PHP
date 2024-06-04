import { useState, useEffect } from "react";
import { RiInformation2Line } from "react-icons/ri";
import { FaCircleArrowLeft } from "react-icons/fa6";
import InfoGameButton from "../buttons/InfoGameButton";
import style from "./SideBar.module.css";

const SideBar = ({ game }: { game: string }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    console.log("Toggling sidebar, current state:", expanded);
    setExpanded(!expanded);
  };

  useEffect(() => {
    console.log("Sidebar updated, expanded:", expanded);
  }, [expanded]);

  return (
    <div className={`${style.sidebar} ${expanded ? "style.expanded" : ""}`}>
      <div className={style.sidebarHandle} onClick={toggleSidebar}>
        <span>
          <FaCircleArrowLeft />
        </span>
      </div>
      <div className={style.sidebarContent}>
        <h1 className={style.title}>{game}</h1>
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
