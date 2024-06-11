import { GiCardAceSpades } from "react-icons/gi";
import { ImClubs } from "react-icons/im";
import { SiApplearcade } from "react-icons/si";
import { MdCasino } from "react-icons/md";
import { GiBrain } from "react-icons/gi";
import { FaHeadSideVirus, FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Props {
  toggleMenu: boolean;
  openPopup: () => void;
  handleToggleMenu: () => void;
  handleToggleSearch: (toggle: boolean) => void;
}

const NavBar = ({
  toggleMenu,
  openPopup,
  handleToggleMenu,
  handleToggleSearch,
}: Props) => {
  return (
    <nav
      className={`w-full transition duration-300 ease-out absolute top-20 z-10  ${
        !toggleMenu ? "-translate-x-[1024px]" : "translate-x-0"
      } lg:translate-x-0 lg:top-32 `}>
      <ul className="w-full flex flex-col lg:flex-row lg:justify-evenly lg:h-20 lg:items-center">
        <li className="h-20 grid place-content-center text-[#E8DCF4] border-[#4f1b83] border-b-4 bg-[#8235D0] text-2xl lg:hidden">
          <button onClick={openPopup}>
            {/* {loggedIn ? "Cerrar sesión" : "*/}
            Ingresar{/*"}*/}
          </button>
        </li>

        <li
          className="h-20 grid place-content-center text-[#110D1B] bg-[#8235D0] border-[#4f1b83] border-b-4 lg:w-36 lg:border-b-0 lg:rounded-xl lg:hidden"
          onClick={() => handleToggleMenu()}>
          <div
            className="flex text-2xl text-[#E8DCF4]"
            onClick={() => handleToggleSearch(true)}>
            <FaMagnifyingGlass />
            <p className="px-3">Buscar</p>
          </div>
        </li>

        <Link to="/categorias/cartas">
          <li
            className="h-16 flex justify-center items-center text-2xl text-[#110D1B] bg-[#CFB3EA] border-[#B58AE0] border-b-4 lg:w-32 lg:text-xl lg:border-b-0 lg:rounded-xl lg:hover:bg-[#110D1B] lg:hover:text-[#CFB3EA] transition ease-in delay-150 duration-300"
            onClick={() => handleToggleMenu()}>
            <GiCardAceSpades />
            <p className="px-3 lg:px-1">Cartas</p>
          </li>
        </Link>

        <Link to="/categorias/estrategia">
          <li
            className="h-16 flex justify-center items-center text-2xl text-[#110D1B] bg-[#CFB3EA]  border-[#B58AE0] border-b-4 lg:w-36 lg:text-xl lg:border-b-0 lg:rounded-xl lg:hover:bg-[#110D1B] lg:hover:text-[#CFB3EA] transition ease-in delay-150 duration-300"
            onClick={() => handleToggleMenu()}>
            <ImClubs /> <p className="px-3 lg:px-1">Estrategía</p>
          </li>
        </Link>

        <Link to="/categorias/arcade">
          <li
            className="h-16 flex justify-center items-center text-2xl text-[#110D1B] bg-[#CFB3EA]  border-[#B58AE0] border-b-4 lg:w-36 lg:text-xl lg:border-b-0 lg:rounded-xl lg:hover:bg-[#110D1B] lg:hover:text-[#CFB3EA] transition ease-in delay-150 duration-300"
            onClick={() => handleToggleMenu()}>
            <SiApplearcade /> <p className="px-3 lg:px-1">Arcade</p>
          </li>
        </Link>

        <Link to="/categorias/mesa">
          <li
            className="h-16 flex justify-center items-center text-2xl text-[#110D1B] bg-[#CFB3EA]  border-[#B58AE0] border-b-4 lg:w-36 lg:text-xl lg:border-b-0 lg:rounded-xl lg:hover:bg-[#110D1B] lg:hover:text-[#CFB3EA] transition ease-in delay-150 duration-300"
            onClick={() => handleToggleMenu()}>
            <MdCasino /> <p className="px-3 lg:px-1">Mesa</p>
          </li>
        </Link>

        <Link to="/categorias/memoria">
          <li
            className="h-16 flex justify-center items-center text-2xl text-[#110D1B] bg-[#CFB3EA]  border-[#B58AE0] border-b-4 lg:w-36 lg:text-xl lg:border-b-0 lg:rounded-xl lg:hover:bg-[#110D1B] lg:hover:text-[#CFB3EA] transition ease-in delay-150 duration-300"
            onClick={() => handleToggleMenu()}>
            <GiBrain /> <p className="px-3 lg:px-1">Memoria</p>
          </li>
        </Link>

        <Link to="/categorias/quiz">
          <li
            className="h-16 flex justify-center items-center text-2xl text-[#110D1B] bg-[#CFB3EA] lg:w-36 lg:text-xl lg:border-b-0 lg:rounded-xl lg:hover:bg-[#110D1B] lg:hover:text-[#CFB3EA] transition ease-in delay-150 duration-300"
            onClick={() => handleToggleMenu()}>
            <FaHeadSideVirus /> <p className="px-3 lg:px-1">Quiz</p>
          </li>
        </Link>
      </ul>
    </nav>
  );
};
export default NavBar;
