// styles
import './styles.css';
// components
import Navbar from '../Navbar';
import {useContext} from 'react';
import {CartContext} from '../../hooks/useCart.jsx';
import {NavLink} from 'react-router-dom';
import Button from '/src/components/Button';
import ShoppingCart from '../../components/svgs/ShoppingCart.jsx';

export default function Header() {
    const {sendOrde, cartCount} = useContext(CartContext);
    return (
        <header>
            <div className="container">
                <div className="flex col align-center justify-center">

                    <NavLink
                        to="/"
                        id="mainTitle"
                        arial-label="Revenir à la page d'accueil"
                        tabIndex={0}
                    >
                        <h1>Basaalt.com</h1>
                    </NavLink>

                    <div className="flex justify-between align-center">
                        <Navbar
                            isFooter={false}
                        />
                        <NavLink
                            to="/mon-panier"
                        >

                            <Button
                                id="goToCart"
                                // text="Aller au panier"
                                ariaLabel="Aller au panier"
                                className="CTA"
                                // onClick={sendOrder}
                            >
                                <ShoppingCart/>
                                {cartCount !== 0 ?
                                    <div id="cartCount">{cartCount}</div> : null}
                            </Button>
                        </NavLink>
                    </div>


                </div>
            </div>
        </header>
    );
}