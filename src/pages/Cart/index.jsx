// dependecies
import {useContext} from 'react';

// contexts
import {CartContext} from '../../hooks/useCart.jsx';

// components
import Section from '../../components/Section/index.jsx';
import CartArticleCommand from './CartArticleCommand/index.jsx';
import Button from '../../components/Button/index.jsx';

export default function Cart() {
    const {sendOrder} = useContext(CartContext);
    const {cart, setCart} = useContext(CartContext);
    const articleCommands = cart.articleCommands.length > 0 ? cart.articleCommands : null;

    return (
        <>
            <Section
                id="cart"
                title="Mon panier"
            >
                <div className="cart-content">
                    <div className="flex col">
                        {
                            articleCommands && articleCommands.map((articleCommand, index) => {
                                return (
                                    <CartArticleCommand
                                        key={index}
                                        articleCommand={articleCommand}
                                    />
                                );
                            })
                        }

                        {!articleCommands && <p>Le panier est vide</p>}
                    </div>
                </div>
                <Button
                    id="sendOrder"
                    text="Commander"
                    className="CTA"
                    onClick={sendOrder}
                />
            </Section>


        </>
    );
}
