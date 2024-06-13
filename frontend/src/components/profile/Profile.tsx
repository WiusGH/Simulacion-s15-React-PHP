import React from 'react'
import style from './Profile.module.css'
import GameThumbnail from '../containers/GameThumbnail'
import AchievementThumbnail from '../containers/AchievementThumbnail'

interface Game {
  alt: string
  image: string
  url: string
}

interface Achievement {
  image: React.ReactNode
  title: string
}

interface Props {
  userName: string
  profPic: string
  favorites: Game[]
  achievements: Achievement[]
}

const Profile: React.FC<Props> = ({ userName, profPic, favorites, achievements }) => {
  return (
    <div className={style.profileContainer}>
      <div className={`${style.userDetails} flex column`}>
        <div className='flex align'>
          <img src={profPic} alt="Profile Picture" />
          <div>
            <p className={style.userName}>{userName}</p>
            <a href="#edit-profile">Editar perfil</a>
          </div>
        </div>
        <hr className={style.hr} />
        <a href="#friends">Amigos</a>
        <a href="#messages">Mensajes</a>
        <a href="#achievements">Logros</a>
        <a href="#high-scores">Puntajes altos</a>
      </div>
      <div className={`${style.userFavorites}`}>
        <h3>Favoritos:</h3>
        <div className='flex evenly wrap'>
        {favorites.map((game, index) => (
          <a href={game.url}><GameThumbnail image={game.image} alt={game.alt} key={index} /></a>
        ))}
        </div>
      </div>
      <div className={`${style.userAchievements}`}>
      <h3>Logros:</h3>
      <div className={style.leftAlign}>
        {achievements.map((game, index) => (
          <AchievementThumbnail image={game.image} title={game.title} key={index} />
        ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
