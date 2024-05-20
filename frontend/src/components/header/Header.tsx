import { useState } from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RiStackFill } from "react-icons/ri";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <div>
      <header className="flex center between">
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
          {loggedIn ? (
            <Link to="/favoritos">
              <IoIosStar className="navigation-button" />
            </Link>
          ) : null}
          <button className="navigation-button" onClick={handleLogin}>
            {loggedIn ? "Cerrar sesión" : "Ingresar"}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
