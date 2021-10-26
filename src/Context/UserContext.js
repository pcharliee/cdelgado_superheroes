import { createContext, useState, useContext, useEffect } from "react";
import { getFirestore } from "../firebase/index.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ currentUserCards, setCurrentUserCards ] = useState([]);
  const [ currentUserOrders, setCurrentUserOrders ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!!user) {
      setLoading(prevState => !prevState)
      setCurrentUser(user);
      const db = getFirestore();
      const ordersCollection = db.collection("orders");
      ordersCollection
        .where('buyer.email', '==', user.email)
        .orderBy('date', 'desc')
        .get()
        .then(querySnapshot => {
          const userCards = [];
          const userOrders = [];
          querySnapshot.docs.forEach(doc => {
            let order = { _id: doc.id, ...doc.data() }
            userOrders.push(order);
            setCurrentUserOrders(userOrders);
            doc.data().items.forEach(item => {
              userCards.push(item);
              
            });
            return userCards
          });
        }).then((userCards) => {
          setCurrentUserCards(userCards)
          setLoading(prevState => !prevState)
        });
    };
  }, []);

  const loginUser = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        localStorage.setItem('user', JSON.stringify(user))
        setCurrentUser(user)
        window.location.reload();
      })
      .catch((error) => {
        console.log('Auth error', error)
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
  };

  return (
    <UserContext.Provider 
      value={{ currentUser, loginUser, setCurrentUser, currentUserCards, currentUserOrders, loading }}>
      {props.children}
    </UserContext.Provider>
  )
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) console.log('UserContext is not available here');
  return context;
};