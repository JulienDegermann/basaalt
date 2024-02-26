import { NavLink } from "react-router-dom";
import Button from "./Button";
import { CartContext } from "../hooks/CartContext";
import { useContext } from "react";
import ShopCart from "./svgs/ShopCart";
import Account from "./svgs/Account";
import Close from "./svgs/Close";
import BurgerMenu from "../components/svgs/BurgerMenu.jsx";


export default function Navbar() {

  function menuOpening() {
    document.querySelector('.menu').classList.add('open');
  }

  const { cart } = useContext(CartContext);

  let totalCount = 0;
  cart.map((article) => {
    totalCount += article.quantity;
  });
  function showCart() {
    document.querySelector('.cart-content').classList.remove('hide');
  }

  function menuClosing() {
    document.querySelector('.menu').classList.remove('open');
  }

  return (
    <div className="navigation">
                <Button text={<BurgerMenu />} className="mobile" onClick={menuOpening} />

      <ul className="menu">
        <Button className="mobile" text={<Close />} onClick={menuClosing} />
        
        
        <NavLink to="/" className={nav => nav.isActive ? "active" : ""}>
          <li>Accueil</li>
        </NavLink>
        <NavLink to="/nos-concerts" className={nav => nav.isActive ? "active" : ""}>
          <li>Concerts</li>
        </NavLink>
        <NavLink to="/la-boutique" className={nav => nav.isActive ? "active" : ""}>
          <li>Boutique</li>
        </NavLink>
        <NavLink to="/contact" className={nav => nav.isActive ? "active" : ""}>
          <li>Contact</li>
        </NavLink>
      </ul>
      <ul className="cart-container">
        <NavLink to="/mon-compte" className={nav => nav.isActive ? "active" : ""}>
          <li>{<Account />}</li>
        </NavLink>
        <Button
          text={<ShopCart />}
          className="cart-button flex justify-center align-center"
          onClick={showCart}
        />
        {
          cart.length > 0 && (<p className="article-count flex justify-center align-center">{totalCount}</p>)
        }



      </ul>
    </div>
  )
}