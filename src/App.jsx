import './assets/styles/index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Concerts from './pages/Concerts.jsx';
import Boutique from './pages/Boutique.jsx';
import Contact from './pages/Contact.jsx';
import Account from './pages/Account.jsx';
import Cart from './pages/Cart.jsx';
import Countries from './pages/Countries.jsx';
import Videos from './pages/Videos.jsx';
import { useContext, useEffect, useState } from 'react';
import { CartProvider, CartContext } from './hooks/CartContext.jsx';
import Facebook from './components/svgs/Facebook.jsx';
import Spotify from './components/svgs/Spotify.jsx';
import Youtube from './components/svgs/Youtube.jsx';
import axios from 'axios';


function App() {
  const { cart } = useContext(CartContext);
  const [networks, setNetworks] = useState([]);


  useEffect(() => {
    axios
      .get("https://127.0.0.1:8000/api/plateforms")
      .then((res) => {
        console.log(res.data['hydra:member'])
        setNetworks(res.data['hydra:member'])
      })
      .catch(e => console.log(e))
  }, [])
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home networks={networks} />} />
              <Route path="/nos-concerts" element={<Concerts />} />
              <Route path="/la-boutique" element={<Boutique />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mon-compte" element={<Account />} />
              <Route path="/mon-panier" element={<Cart />} />
              <Route path="/pays" element={<Countries />} />
              <Route path="/nos-clips" element={<Videos />} />
              <Route path="/*" element={<Home networks={networks} />} />
            </Routes>
          </main>
          <Footer networks={networks} />
        </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App