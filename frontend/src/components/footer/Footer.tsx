import "./Footer.css";
import logo from '../../../public/images/logo.png'

const footer = () => {
  return (
    <div>
      <footer className="flex center align column">
        <div className="links-container flex between">
          <div>
            <ul className="discless">
              <li>Opción 1</li>
              <li>Opción 2</li>
              <li>Opción 3</li>
            </ul>
          </div>
          <div>
            <ul className="discless">
              <li>Opción 4</li>
              <li>Opción 5</li>
              <li>Opción 6</li>
            </ul>
          </div>
          <div>
            <ul className="discless">
              <li>Opción 7</li>
              <li>Opción 8</li>
              <li>Opción 9</li>
            </ul>
          </div>
        </div>
        <img className="footer-logo" src={logo} alt="Logo" />
        <p>©2024 Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default footer;
