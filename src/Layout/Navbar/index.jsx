// styles
import "./styles.css";

// contexts
import { useContext, useEffect } from "react";
import { CartContext } from "../../hooks/useCart";

// components
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";

// svgs
import Close from "../../components/svgs/Close";
import BurgerMenu from "../../components/svgs/BurgerMenu";
import ShopCart from "../../components/svgs/ShopCart";
import Account from "../../components/svgs/Account";

export default function Navbar() {

  function menuOpening() {
    document.querySelector('.menu').classList.add('open');
  }

  const { cart } = useContext(CartContext);
  const { totalItems } = useContext(CartContext);

  function closeMenu() {
    document.querySelector('.menu').classList.remove('open');
  }


  useEffect(() => { }
  )
  // let totalCount = 0;
  // cart.map((article) => {
  //   totalCount += article.quantity;
  // });

  function showCart() {
    document.querySelector('.cart-background').classList.remove('hide');
  }

  function menuClosing() {
    document.querySelector('.menu').classList.remove('open');
  }

  return (
    <div className="navigation">
      <Button text={<BurgerMenu />} id="burgerMenu" className="mobileButtons" onClick={menuOpening} />

      <ul className="menu">
        <Button className="mobileButtons" text={<Close />} onClick={menuClosing} />
        <li>
          <NavLink to="/" className={nav => nav.isActive ? "active" : ""} onClick={closeMenu}>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink to="/nos-concerts" className={nav => nav.isActive ? "active" : ""} onClick={closeMenu} >
            Concerts
          </NavLink>
        </li>
        <li>
          <NavLink to="/la-boutique" className={nav => nav.isActive ? "active" : ""} onClick={closeMenu} >
            Boutique
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={nav => nav.isActive ? "active" : ""} onClick={closeMenu} >
            Contact
          </NavLink>
        </li>
      </ul>
      <ul className="cart-container">
        <NavLink to="/mon-compte" className={nav => nav.isActive ? "active" : ""} onClick={closeMenu} >
          <li>{<Account />}</li>
        </NavLink>
        <Button
          text={<ShopCart />}
          className="cart-button flex justify-center align-center"
          onClick={showCart}
        />
        {
          cart.length > 0 && (<p className="article-count flex justify-center align-center">{totalItems}</p>)
        }
      </ul>
    </div>
  )
}