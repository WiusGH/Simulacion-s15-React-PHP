import './MainContainer.css'

const MainContainer = ({ game }: { game: React.ReactNode }) => {
// const MainContainer = ({ game, sidebar }: { game: React.ReactNode, sidebar: React.ReactNode }) => {
  return (
    <div className='flex center align main-container'>
      {game}
      {/*// Agregar sidebar a futuro */}
    </div>
  )
}

export default MainContainer