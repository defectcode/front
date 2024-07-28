
import Carousel from "./components/Carousel/Carousel";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import OurMission from './components/OurMission/OurMission';
import OurTeam from './components/OurTeam/OurTeam';

export default function Home() {
  return (
    <main className="">
      <Header/>
      <Carousel/>
      <OurMission/>
      <OurTeam/>
      <Footer/>
    </main>
  );
}
