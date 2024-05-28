import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Slider from "../components/slider/Slider";

const Home = () => {
  return (
    <div>
      <Header />
      <h3>Top juegos</h3>
      <Slider />
      <h3>Juegos nuevos</h3>
      <Slider />
      <h3>Juegos recomendados</h3>
      <Slider />
      <Footer />
    </div>
  );
};

export default Home;
