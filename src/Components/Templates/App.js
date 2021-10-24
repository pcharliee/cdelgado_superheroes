import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CartProvider } from '../../Context/CartContext.js';
import { UserProvider } from '../../Context/UserContext.js';
import NavBar from '../Organisms/NavBar/NavBar.jsx';
import MainPage from '../Organisms/MainPage/MainPage.jsx';
import HeroCards from '../Organisms/HeroCards/HeroCards';
import Loading from '../Atoms/Loading/Loading.jsx';
import HeroDetails from '../Organisms/HeroDetails/HeroDetails.jsx';
import Cart from '../Organisms/Cart/Cart.jsx';
import Academy from '../Organisms/Academy/Academy.jsx';
import Orders from '../Organisms/Orders/Orders.jsx';
import NotFound from '../Organisms/NotFound/NotFound.jsx';
import './App.scss';

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

  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="App">
            <NavBar />
            { loading && <Loading />}
            { !loading &&
              <Switch>
                <Route exact path='/' component={MainPage} />
                <Route exact path='/super-coach'>
                  <HeroCards characters={characters} />
                </Route>
                <Route exact path='/academy'>
                  <Academy characters={characters} />
                </Route>
                <Route exact path='/super-coach/:id' component={HeroDetails} />
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/my-orders' component={Orders} />
                <Route exact path='/*'>
                  <NotFound text='404 - No se ha encontrado nada' />
                </Route>
              </Switch>
            }
          </div>
        </BrowserRouter>
      </CartProvider> 
    </UserProvider>
  );
};

export default App;