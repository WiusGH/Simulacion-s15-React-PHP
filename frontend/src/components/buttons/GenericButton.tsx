import style from './GenericButton.module.css'

const GenericButton = ({ text, func, disabled = false }: { text: string, func: () => void, disabled?: boolean}) => {
  return (
    <div>
      <button className={disabled ? `${style.genericButton} ${style.disabled}` : style.genericButton} onClick={func}>{text}</button>
    </div>
  )
}

export default GenericButton