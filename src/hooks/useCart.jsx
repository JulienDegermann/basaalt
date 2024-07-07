// dependenies
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

// contexts
export const CartContext = createContext([]);

// components 
import { NavLink } from 'react-router-dom';
import Button from '../components/Button';

// svgs
import Close from '../components/svgs/Close';


export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  function close() {
    document.querySelector('.cart-background').classList.add('hide');
  }


  useEffect(() => {
    setTotalCost(cart.reduce((acc, item) => acc + (item.article.price * item.quantity), 0))
    setTotalItems(cart.reduce((acc, item) => acc + item.quantity, 0))
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <div className="cart-background hide">
        <div className="flex col cart-content justify-between hide">

          <Button text={<Close />} className="close" onClick={close} />
          <h3>Mon panier</h3>
          <div className="flex col">
            {
              cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <h4>{item.article.name}</h4>
                  <div className="flex justify-between">
                    <p>{item.quantity} x {item.article.price}€</p>
                    <p>{(Math.round(item.quantity * item.article.price * 100)) / 100} €</p>
                  </div>
                </div>
              ))
            }
          </div>

          <div className='cart-total flex justify-center'>
            <p>totalItems</p>
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

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};