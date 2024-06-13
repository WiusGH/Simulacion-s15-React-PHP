import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RiStackFill } from "react-icons/ri";
import logo from "../../../public/images/Logopng.png";
import Modal from "../modal/Modal";
import Search from "../../pages/Search";
import CardGame from "../card/CardGame";
import NotFound from "../card/NotFound";
import SearchGame from "../../hook/SearchGame";
import NavBar from "./NavBar";
import axios from "axios";

interface UserData {
  username: string;
  email: string;
  id: number;
}

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://www.backendrestfulltest.icu/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setLoggedIn(true);
          setUserData(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
          setLoggedIn(false);
        });
    }
  }, []);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("data");
    setLoggedIn(false);
    setUserData(null);
  };

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
          <div className="w-1/2 h-20">
            <Link to="/">
              <img className="w-full h-full object-contain" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="hidden lg:w-1/3 lg:grid place-content-center">
            <div
              className="text-3xl text-[#E8DCF4]"
              onClick={() => handleToggleSearch(true)}
            >
              <FaMagnifyingGlass />
            </div>
            {loggedIn ? (
              <Link to="/favoritos">
                {/* Add your favorite icon here */}
              </Link>
            ) : null}
          </div>
          {loggedIn ? (
            <>
              <div className="hidden lg:w-1/3 lg:grid place-content-center lg:text-2xl lg:tracking-widest  lg:text-[#E8DCF4]">
                {userData && <span>¡Hola, {userData.username}!</span>}
                <a href="/perfil/wius"> Ver perfil</a>
              </div>
              <button
                className="hidden lg:w-1/3 lg:grid place-content-center lg:text-2xl lg:tracking-widest  lg:text-[#E8DCF4]"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              className="hidden lg:w-1/3 lg:grid place-content-center lg:text-2xl lg:tracking-widest  lg:text-[#E8DCF4]"
              onClick={openPopup}
            >
              Ingresar
            </button>
          )}
          <div
            className="w-20 grid place-content-center text-5xl  text-[#E8DCF4] lg:hidden"
            onClick={() => handleToggleMenu()}
          >
            <RiStackFill />
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
