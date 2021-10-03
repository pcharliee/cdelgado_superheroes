import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CartProvider } from '../../Context/CartContext.js';
import NavBar from '../Organisms/NavBar/NavBar.jsx';
import Carousel from '../Molecules/Carousel/Carousel';
import HeroCards from '../Organisms/HeroCards/HeroCards';
import Loading from '../Atoms/Loading/Loading.jsx';
import HeroDetails from '../Organisms/HeroDetails/HeroDetails.jsx';
import Cart from '../Organisms/Cart/Cart.jsx';
import Academy from '../Organisms/Academy/Academy.jsx';
import NotFound from '../Organisms/NotFound/NotFound.jsx';
import './App.scss';
import { getFirestore } from '../../firebase/index.js';

function App() {
  const [ characters, setCharacters ] = useState([])
  const [ loading, setLoading ] = useState(false);
  
  useEffect(() => {
    setLoading(prevState => !prevState);
    fetch('https://akabab.github.io/superhero-api/api/all.json')
      .then(response => response.json())
      .then(data => {
        data.map(item => {
          return Object.assign(item, { quantity: 1, price: item.powerstats.strength })
        });
        setCharacters(data);
        setLoading(prevState => !prevState);
        });
  }, []);

  const db = getFirestore();
  const heroesCollection = db.collection('heroes');
  console.log('hero', heroesCollection.get().then(querySnapshot => {
    console.log(querySnapshot)
  }))

  return (
    <CartProvider>
    <BrowserRouter>
      <div className="App">
        <NavBar />
        { loading && <Loading />}
        { !loading &&
          <Switch>
            <Route exact path='/' component={Carousel} />
            <Route exact path='/carousel' component={Carousel} />
            <Route exact path='/super-coach'>
              <HeroCards characters={characters} />
            </Route>
            <Route exact path='/academia'>
              <Academy characters={characters} />
            </Route>
            <Route exact path='/super-coach/:id' component={HeroDetails} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/*'>
              <NotFound text='404 - No se ha encontrado nada' />
            </Route>
          </Switch>
        }
      </div>
      </BrowserRouter>
    </CartProvider> 
  );
};

export default App;
