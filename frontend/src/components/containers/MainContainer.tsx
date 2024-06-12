import style from "./MainContainer.module.css";
import SideBar from "../sidebar/SideBar";

const MainContainer = ({ game, gameName }: { game: React.ReactNode, gameName: string }) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.gameContent}>
        {game}
      </div>
      <div className={style.sidebar}>
      <SideBar game={gameName} />
      </div>
    </div>
  );
};

export default MainContainer;
