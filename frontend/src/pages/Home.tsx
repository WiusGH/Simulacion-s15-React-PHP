import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Slider from "../components/slider/Slider";
import Title from "../components/slider/Title";

const Home = () => {
  return (
    <div>
      <Header />
      <Title text="Top juegos" />
      <Slider />
      <Title text="Juegos nuevos" />
      <Slider />
      <Title text="Juegos recomendados" />
      <Slider />
      <Footer />
    </div>
  );
};

export default Home;
