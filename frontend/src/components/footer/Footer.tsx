import style from "./Footer.module.css";
import logo from "../../../public/images/Logopng.png";

const footer = () => {
  return (
    <div>
      <footer className={style.footer}>
        <a href="/"><img className={style.footerLogo} src={logo} alt="Logo" /></a>
        <p>©2024 Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default footer;
