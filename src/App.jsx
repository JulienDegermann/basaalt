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

function App() {
  const { cart } = useContext(CartContext);

  console.log(cart);
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nos-concerts" element={<Concerts />} />
              <Route path="/la-boutique" element={<Boutique />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mon-compte" element={<Account />} />
              <Route path="/mon-panier" element={<Cart />} />
              <Route path="/pays" element={<Countries />} />
              <Route path="/nos-clips" element={<Videos />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App