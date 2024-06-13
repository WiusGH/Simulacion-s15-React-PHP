import React from 'react';
import style from './AchievementThumbnail.module.css';

const AchievementThumbnail = ({ image, title } : { image: React.ReactNode, title: string }) => {
  return (
    <div className={`${style.achievementThumbnailContainer} flex center align`}>
      {image}
      <p>{title}</p>
    </div>
  );
};

export default AchievementThumbnail;
