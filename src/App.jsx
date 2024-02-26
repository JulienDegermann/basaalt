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
import { useContext } from 'react';
import { CartProvider, CartContext } from './hooks/CartContext.jsx';
import Facebook from './components/svgs/Facebook.jsx';
import Spotify from './components/svgs/Spotify.jsx';
import Youtube from './components/svgs/Youtube.jsx';


function App() {
  const { cart } = useContext(CartContext);

  const networks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/basaaltband/",
      image: Facebook
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/artist/5CP1jB3dlYFMZgA9iC8fUd?si=C2dPWrgRSuGFpgy9rqFBsg",
      image: Spotify
    },
    {
      name: "Youtube",
      url: "https://www.youtube.com/@basaalt",
      image: Youtube
    }
  ];

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