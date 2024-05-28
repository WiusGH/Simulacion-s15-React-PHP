import { Link } from 'react-router-dom'
import error404 from '../../public/images/404.png'
import Error404Button from '../components/buttons/Error404Button'

const Error404 = () => {
  return (
    <div className='flex column center align'>
      <img style={{marginTop: '20px'}} src={error404} alt="404"/>
      <p>La ruta solicitada no existe</p>
      <Link to={"/"}><Error404Button text='Volver al inicio' /></Link>
    </div>
  )
}

export default Error404