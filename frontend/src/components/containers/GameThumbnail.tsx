import './GameThumbnail.css'


const GameThumbnail = ({image, alt}: {image: string, alt: string}) => {
  return (
    <div className='GameThumbnailContainer flex center'>
      <img src={image} alt={alt}/>
    </div>
  )
}

export default GameThumbnail