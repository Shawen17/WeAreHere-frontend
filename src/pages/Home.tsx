import Slide from "../components/Home/Slide";
import UpperPage from "../components/Home/UpperPage";
import image from "../img/bg-01.jpg";
import NavBar from "../components/NavBar";
import Middle from "../components/Home/Middle";

const Home = () => {
  document.title = "home";
  return (
    <div style={{ backgroundImage: `url(${image})` }}>
      <NavBar />
      <UpperPage />
      <Middle />
      <Slide />
    </div>
  );
};

export default Home;
