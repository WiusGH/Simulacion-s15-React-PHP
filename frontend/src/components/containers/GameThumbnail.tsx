import style from "./GameThumbnail.module.css";

const GameThumbnail = ({ image, alt }: { image: string; alt: string }) => {
  return (
    <div className={style.GameThumbnailContainer}>
      <img src={image} alt={alt} />
    </div>
  );
};

export default GameThumbnail;
