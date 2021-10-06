import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CartProvider } from '../../Context/CartContext.js';
import { getFirestore } from '../../firebase/index.js';
import NavBar from '../Organisms/NavBar/NavBar.jsx';
import Carousel from '../Molecules/Carousel/Carousel';
import HeroCards from '../Organisms/HeroCards/HeroCards';
import Loading from '../Atoms/Loading/Loading.jsx';
import HeroDetails from '../Organisms/HeroDetails/HeroDetails.jsx';
import Cart from '../Organisms/Cart/Cart.jsx';
import Academy from '../Organisms/Academy/Academy.jsx';
import NotFound from '../Organisms/NotFound/NotFound.jsx';
import './App.scss';

function App() {
  const [ characters, setCharacters ] = useState([])
  const [ loading, setLoading ] = useState(false);
  
  useEffect(() => {
      setLoading(prevState => !prevState);
    const db = getFirestore();
    const heroesCollection = db.collection('heroes');
    const tempCharacters = heroesCollection.limit(5);
    tempCharacters.get().then(querySnapshot => {
    const characters = querySnapshot.docs.map(doc => {
        return { _id: doc.id, ...doc.data() }
      });
    setCharacters(characters);
    setLoading(prevState => !prevState);
    });
  }, []);

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
