import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Title from '../components/Title.jsx';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Close from '../components/svgs/Close.jsx';

export const CartContext = createContext([]);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  function close() {
    document.querySelector('.cart-background').classList.add('hide');
  }

  let totalCost = 0
  cart.map((article) => {
    totalCost += article.price * article.quantity;
  })
  totalCost = (Math.round(totalCost * 100)) / 100;

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <div className="cart-background hide">
      <div className="flex col cart-content justify-between hide">

        <Button text={<Close />} className="close" onClick={close} />

        <Title level="3" text="Mon panier" />
        <div className="flex col">
          {
            cart.map((article, index) => (
              <div key={index} className="cart-item">
                <Title level="4" text={article.name} />
                <div className="flex justify-between">
                  <p>{article.quantity} x {article.price}€</p>
                  <p>{(Math.round(article.quantity * article.price * 100)) / 100} €</p>
                </div>
              </div>
            ))
          }
        </div>

        <div className='cart-total flex justify-center'>
          <p>total</p>
          <p>{`${totalCost} €`}</p>
          <NavLink to="/mon-panier" className={nav => nav.isActive ? "active CTA" : "CTA"} onClick={close}>
            <li>voir mon panier</li>
          </NavLink>
        </div>
      </div>

      </div>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.array.isRequired
};