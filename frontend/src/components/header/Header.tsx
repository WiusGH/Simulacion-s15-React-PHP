import { useState } from "react";
//import style from "./Header.module.css";
import logo from "../../../public/images/Logopng.png";
import { Link } from "react-router-dom";
//import { IoIosStar } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RiStackFill } from "react-icons/ri";
//import HeaderButton from "../buttons/HeaderButton";
import Modal from "../modal/Modal";
import Search from "../../pages/Search";
import CardGame from "../card/CardGame";
import NotFound from "../card/NotFound";
import SearchGame from "../../hook/SearchGame";
import NavBar from "./NavBar";

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

  const {
    handleToggleSearch,
    handleSearchGame,
    handleError,
    handleToggleMenu,
    toggleMenu,
    toggleSearch,
    allGames,
    notFound,
    findGame,
  } = SearchGame();

  return (
    <>
      <header className="w-full h-20 bg-[#4f1b83] relative z-10 lg:h-56">
        <div className="h-20 flex justify-between lg:h-28">
          <div className="w-1/2 h-20 ">
            <Link to="/">
              <img
                className="w-full h-full object-contain"
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>
          <div className="hidden lg:w-1/3 lg:grid place-content-center">
            <div
              className="text-3xl text-[#E8DCF4]"
              onClick={() => handleToggleSearch(true)}>
              <FaMagnifyingGlass />
            </div>
            {/*{loggedIn ? (
            <Link to="/favoritos">
              <IoIosStar className={style.navigationButton} />
            </Link>
          ) : null}*/}
          </div>

          <button
            className="hidden lg:w-1/3 lg:grid place-content-center lg:text-2xl lg:tracking-widest  lg:text-[#E8DCF4]"
            onClick={openPopup}>
            {/* {loggedIn ? "Cerrar sesión" : "*/}
            Ingresar{/*"}*/}
          </button>

          <div
            className="w-20 grid place-content-center text-5xl  text-[#E8DCF4] lg:hidden"
            onClick={() => handleToggleMenu()}>
            {/*<Link className="text-4xl text-[#E8DCF4]" to="/">*/}
            <RiStackFill />
            {/*</Link>*/}
          </div>

          <NavBar
            toggleMenu={toggleMenu}
            openPopup={openPopup}
            handleToggleMenu={handleToggleMenu}
            handleToggleSearch={handleToggleSearch}
          />
        </div>

        <Modal isOpen={isOpen} onClose={closePopup}></Modal>

        <div>
          {toggleSearch && (
            <>
              <Search
                handleSearchGame={handleSearchGame}
                allGames={allGames}
                handleToogleSearch={handleToggleSearch}
              />
              {!notFound ? (
                <CardGame findGame={findGame} />
              ) : (
                <NotFound handleError={handleError} notFound={notFound} />
              )}
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
