import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import MainContainer from "../components/containers/MainContainer"
import Simon from "../components/games/Simon"

const GameViewer = () => {
  return (
    <div>
      <Header />
      <MainContainer game={<Simon />}/>
      <Footer />
    </div>
  )
}

export default GameViewer