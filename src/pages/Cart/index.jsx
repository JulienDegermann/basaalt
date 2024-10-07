// styles
import './styles.css';

// dependecies
import {useContext} from 'react';

// contexts
import {CartContext} from '../../hooks/useCart.jsx';

// components
import Section from '../../components/Section/index.jsx';
import CartArticleCommand from './CartArticleCommand/index.jsx';
import Button from '../../components/Button/index.jsx';
import UserForm from '../../components/UserForm/index.jsx';

export default function Cart() {
    const {sendOrder} = useContext(CartContext);
    const {cart, setCart} = useContext(CartContext);
    const articleCommands = cart.articleCommands?.length > 0 ? cart.articleCommands : null;

    const totalCost = cart?.articleCommands?.reduce((count, articleCommand) => count + (articleCommand.quantity * articleCommand.stock.article.price), 0);

    return (
        <>
            <Section
                id="cart"
                title="Mon panier"
            >
                {!articleCommands && <p>Le panier est vide</p>}
                {articleCommands &&

                    <div className="flex">
                        <div id="cartContent">
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

                            </div>
                            <p id="totalCost">TOTAL : {totalCost} €</p>
                        </div>

                        <div className="userDatas">
                            <form>
                                <UserForm isMessage={false}/>
                            </form>
                            <Button
                                id="sendOrder"
                                text="Commander"
                                className="CTA"
                                onClick={sendOrder}
                            />
                        </div>
                    </div>
                }
            </Section>


        </>
    );
}
