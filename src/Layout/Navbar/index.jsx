// styles
import './styles.css';

// contexts
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

// components
import Button from '../../components/Button';
import {NavLink} from 'react-router-dom';

// svgs
import Close from '../../components/svgs/Close';
import BurgerMenu from '../../components/svgs/BurgerMenu';

export default function Navbar({isFooter = false}) {

    const [menuOpened, setMenuOpened] = useState(false);

    const closeMenuEscape = e => {
        if (e.key === 'Escape') {
            setMenuOpened(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', closeMenuEscape);
        return () => {
            document.removeEventListener('keydown', closeMenuEscape);
        };
    }, []);

    return (
        <nav className="navigation" role="navigation">
            <Button
                text={!menuOpened ? <BurgerMenu/> : <Close/>}
                id={!menuOpened ? 'burgerMenu' : 'closeMenu'}
                className="mobileButtons"
                onClick={() => {
                    setMenuOpened(!menuOpened);
                }}
                ariaLabel={menuOpened ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={menuOpened}
                tabIndex={0}
            />

            {/* <Button
        className="mobileButtons"
        text={<Close />}
        onClick={() => { setMenuOpened(false) }}
        ariaLabel="Fermer le menu"
      /> */}
            <ul className={menuOpened ? 'menu open' : 'menu'}>
                <li>
                    <NavLink
                        to="/"
                        aria-label="Accéder à la page d'accueil"
                        className={nav => nav.isActive ? 'active' : ''}
                        aria-current={nav => nav.isActive ? 'page' : undefined}
                        onClick={() => {
                            setMenuOpened(false);
                        }}
                        tabIndex={!isFooter ? 0 : -1}
                    >
                        Accueil
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/nos-concerts"
                        aria-label="Accéder à la page des concerts"
                        className={nav => nav.isActive ? 'active' : ''}
                        aria-current={nav => nav.isActive ? 'page' : undefined}
                        onClick={() => {
                            setMenuOpened(false);
                        }}
                        tabIndex={!isFooter ? 0 : -1}
                    >
                        Concerts
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/la-boutique"
                        aria-label="Accéder à la page de la boutique"
                        className={nav => nav.isActive ? 'active' : ''}
                        aria-current={nav => nav.isActive ? 'page' : undefined}
                        onClick={() => {
                            setMenuOpened(false);
                        }}
                        tabIndex={!isFooter ? 0 : -1}
                    >
                        Boutique
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/contact"
                        aria-label="Accéder à la page de contact"
                        className={nav => nav.isActive ? 'active' : ''}
                        aria-current={nav => nav.isActive ? 'page' : undefined}
                        onClick={() => {
                            setMenuOpened(false);
                        }}
                        tabIndex={!isFooter ? 0 : -1}
                    >
                        Contact
                    </NavLink>
                </li>
            </ul>
            {/* <ul className="cart-container">
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
      </ul> */}
        </nav>
    );
}

Navbar.propTypes = {
    isFooter: PropTypes.bool.isRequired
};