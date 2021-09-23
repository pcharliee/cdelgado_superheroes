import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CartContext, CartProvider } from '../../Context/CartContext.js';
import NavBar from '../Organisms/NavBar/NavBar.jsx';
import Carousel from '../Molecules/Carousel/Carousel';
import HeroCards from '../Organisms/HeroCards/HeroCards';
import Loading from '../Atoms/Loading/Loading.jsx';
import HeroDetails from '../Organisms/HeroDetails/HeroDetails.jsx';
import NotFound from '../Organisms/NotFound/NotFound.jsx';
import './App.scss';


function App() {
  const [ characters, setCharacters ] = useState([])
  const [ loading, setLoading ] = useState(false);
  const [ cartItems, setCartItems ] = useState([1,2,3,4])
  
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
    <CartContext.Provider value={cartItems}>
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
            <Route exact path='/*'>
              <NotFound text='404 - No se ha encontrado nada' />
            </Route>
          </Switch>
        }
      </div>
    </CartContext.Provider> 
      </BrowserRouter>
  );
};

export default App;
