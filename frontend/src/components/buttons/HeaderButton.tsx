import './HeaderButton.css'

const HeaderButton = ({text, icon}: {text: string, icon: React.ReactNode}) => {
  return (
    <div className='flex align header-button'>
      {icon}
      &nbsp;
      {text}
    </div>
  )
}

export default HeaderButton