import React from 'react'
// import { useParams } from "react-router-dom"; // Obtiene parámetros de la url
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Profile from '../components/profile/Profile'
import simon from '../../public/images/simon.png'
import rpslp from '../../public/images/rpsls/rpsls.jpg'
import connect4 from '../../public/images/connect4.png'
import wius from '../../public/images/wius.jpg'
import { PiNumberCircleFiveBold } from "react-icons/pi";
import { TiStarFullOutline } from "react-icons/ti";
import { LiaUserFriendsSolid } from "react-icons/lia";

const ProfileViewer: React.FC = () => {
  // Aquí va la API para obtener datos del usuario
  // Pero temporalmente se utilizará un json

  const userData = {
    name: "wius",
    image: wius,
    favorites: [
      { alt: "simon", image: simon, url: "/jugar/Simon" },
      { alt: "piedrapapeltijeraslagartospock", image: rpslp, url: "/jugar/PiedraPapelTijerasLagartoSpock" },
      { alt: "connect4", image: connect4, url: "/jugar/Connect4" },
    ],
    achievements: [
      { title: "Juega 5 jugos distintos", image: <PiNumberCircleFiveBold /> },
      { title: "Agrega 1 juego a favoritos", image: <TiStarFullOutline /> },
      { title: "Agrega 1 amigo", image: <LiaUserFriendsSolid /> },
    ]
  }

  const { name: userName, image: profPic, favorites, achievements } = userData;

  // const { user } = useParams<{ user: string }>();

  return (
    <div>
      <Header />
      <Profile userName={userName} profPic={profPic} favorites={favorites} achievements={achievements} />
      <Footer />
    </div>
  )
}

export default ProfileViewer
