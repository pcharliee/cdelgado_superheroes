import './App.scss';
import NavBar from '../Organisms/NavBar/NavBar.jsx';
import Carousel from '../Molecules/Carousel/Carousel';
import HeroCards from '../Organisms/HeroCards/HeroCards';
import characters from '../../Data/characters.json'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Carousel />
      <HeroCards characters={characters} />
    </div>
  );
};

export default App;
