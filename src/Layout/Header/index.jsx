// styles
import './styles.css';
// components
import Navbar from '../Navbar';
import {useContext} from 'react';
import {CartContext} from '../../hooks/useCart.jsx';
import {NavLink} from 'react-router-dom';
import Button from '/src/components/Button';

export default function Header() {
    const {sendOrder} = useContext(CartContext);
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
                    </div>

                    <Button
                        id="sendOrder"
                        text="Valider ma commande"
                        className="CTA"
                        onClick={sendOrder}
                    />
                </div>
            </div>
        </header>
    );
}