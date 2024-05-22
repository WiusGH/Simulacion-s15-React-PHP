import { useState } from "react";
import "./Header.css";
import logo from "../../../public/images/logo.png";
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
    <header>
      <div className="flex center between">
        <div>
          <img className="header-logo" src={logo} alt="Logo" />
        </div>
        <div className="navigation flex center align evenly">
          <Link className="navigation-button" to="/">
            <RiStackFill />
          </Link>
          <Link className="navigation-button" to="/">
            <FaMagnifyingGlass />
          </Link>
          {/*{loggedIn ? (
            <Link to="/favoritos">
              <IoIosStar className="navigation-button" />
            </Link>
          ) : null}*/}
          <button className="navigation-button" onClick={openPopup}>
            {/* {loggedIn ? "Cerrar sesión" : "*/}Ingresar{/*"}*/}
          </button>
        </div>
      </div>
      <div className="flex evenly">
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
