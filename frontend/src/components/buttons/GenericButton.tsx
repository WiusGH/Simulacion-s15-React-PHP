import './GenericButton.css'

const GenericButton = ({ text, func }: { text: string, func: () => void}) => {
  return (
    <div>
      <button className="generic-button" onClick={func}>{text}</button>
    </div>
  )
}

export default GenericButton