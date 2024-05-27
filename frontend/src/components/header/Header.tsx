import { useState } from "react";
import style from "./Header.module.css";
import logo from "../../../public/images/Logopng.png";
import { Link } from "react-router-dom";
//import { IoIosStar } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RiStackFill } from "react-icons/ri";
import HeaderButton from "../buttons/HeaderButton";
import { GiCardAceSpades } from "react-icons/gi";
import { ImClubs } from "react-icons/im";
import { SiApplearcade } from "react-icons/si";
import { MdCasino } from "react-icons/md";
import { GiBrain } from "react-icons/gi";
import Modal from "../modal/Modal";

const Header = () => {
  //const [loggedIn, setLoggedIn] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  /*const handleLogin = () => {
    setLoggedIn(!loggedIn);
  };*/

  return (
    <header className={style.header}>
      <div className={style.box}>
        <div>
          <img className={style.headerLogo} src={logo} alt="Logo" />
        </div>
        <div className={style.navigation}>
          <Link className={style.navigationButton} to="/">
            <RiStackFill />
          </Link>
          <Link className={style.navigationButton} to="/">
            <FaMagnifyingGlass />
          </Link>
          {/*{loggedIn ? (
            <Link to="/favoritos">
              <IoIosStar className={style.navigationButton} />
            </Link>
          ) : null}*/}
          <button className={style.navigationButton} onClick={openPopup}>
            {/* {loggedIn ? "Cerrar sesión" : "*/}Ingresar{/*"}*/}
          </button>
        </div>
      </div>
      <div className={style.buttonBar}>
        <HeaderButton text="Cartas" icon={<GiCardAceSpades />} />
        <HeaderButton text="Suerte" icon={<ImClubs />} />
        <HeaderButton text="Arcade" icon={<SiApplearcade />} />
        <HeaderButton text="Mesa" icon={<MdCasino />} />
        <HeaderButton text="Memoria" icon={<GiBrain />} />
      </div>
      <Modal isOpen={isOpen} onClose={closePopup}></Modal>
    </header>
  );
};

export default Header;
