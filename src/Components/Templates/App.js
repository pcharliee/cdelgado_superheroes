import { useState, useEffect } from 'react';
import NavBar from '../Organisms/NavBar/NavBar.jsx';
import Carousel from '../Molecules/Carousel/Carousel';
import HeroCards from '../Organisms/HeroCards/HeroCards';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Counter from '../Atoms/Counter/Counter';
import Loading from '../Atoms/Loading/Loading.jsx';
import './App.scss';
import HeroDetails from '../Organisms/HeroDetails/HeroDetails.jsx'
import HeroCard from '../Molecules/HeroCard/HeroCard.jsx';


function App() {
  const [ characters, setCharacters ] = useState([])
  const [ loading, setLoading ] = useState(false);
  
  useEffect(() => {
    setLoading(prevState => !prevState);
    fetch('https://akabab.github.io/superhero-api/api/all.json')
      .then(response => response.json())
      .then(data => {
        setCharacters(data);
        setLoading(prevState => !prevState);
        });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        {loading && <Loading />}
        {!loading &&
          <Switch>
            <Route exact path='/' component={Carousel} />
            <Route exact path='/carousel' component={Carousel} />
            <Route exact path='/super-coach'>
              <HeroCards characters={characters} />
            </Route>
            <Route exact path='/super-coach/:id' component={HeroDetails} />
            <Route exact path='/*' component={HeroDetails} />
          </Switch>
        }
      </div>
    </BrowserRouter>
  );
};

export default App;
