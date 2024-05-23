import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
//import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import Categories from './pages/Categories';
import Favorites from './pages/Favorites';
import GameViewer from './pages/GameViewer';
import Error404 from './pages/Error404';

const Routess: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<SignUp />} />
        <Route path="/ingreso" element={<SignIn />} />
        <Route path="/buscar" element={<Search />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/jugar/:game" element={<GameViewer />} /> {/* Monta dinámicamente un juego según el URL introducido */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default Routess;
