// dependencies
import PropTypes from 'prop-types';
import {createContext, useContext, useMemo, useState} from 'react';

import AxiosInstance from '../core/AxiosInstance.js';
import {findUserByEmail} from '../core/GlobalMethods.js';
import {ModalContext} from './useModal.jsx';

// components
// svgs
// contexts
export const CartContext = createContext({});

export function CartContextProvider({children}) {

    const {modals, setModals} = useContext(ModalContext);
    const [cart, setCart] = useState({
        status: 'saved',
        articleCommands: [],
        buyer: {
            firstName: 'Julien',
            lastName: 'Degermann',
            email: 'test@test.com',
            address: '7 rue des proutes',
            city: 'Vannes'
        }
    });

    const cartCount = useMemo(() => {

        if (cart?.articleCommands.length === 0) {
            return 0;
        }
        return cart?.articleCommands?.reduce((count, articleCommand) => count + articleCommand.quantity, 0);
    }, [cart]);

    const addToCart = e => {
        const articleIndex = cart.articleCommands.findIndex(item => item.stock.id === e.stock.id);
        const newCart = {...cart};
        if (articleIndex !== -1) {
            const prevQuantity = parseInt(newCart.articleCommands[articleIndex].quantity);
            const stockQuantity = newCart.articleCommands[articleIndex].quantity;
            if ((prevQuantity + e.quantity) < stockQuantity) {
                newCart.articleCommands[articleIndex].quantity = prevQuantity + e.quantity;
            }
        } else {
            newCart.articleCommands = [...newCart.articleCommands, e];
        }
        return setCart(newCart);
    };

    const removeFromCart = () => {
        console.log('remove from cart');
    };

    const sendOrder = async () => {
        // define buyer
        const user = await findUserByEmail(cart.buyer);
        const buyer = user ? user : cart.buyer;
        cart.buyer = buyer;
        try {
            const response = await new AxiosInstance.post(
                '/api/orders',
                cart,
                {
                    headers:
                        {'Content-Type': 'application/ld+json'}
                });

            console.log(response.status);
            if (response.status === 201) {
                setModals([...modals, {
                    type: 'success',
                    text: 'Votre commande a bien été envoyée'
                }]);
            }
            // if (response.status 201 ): ok -> reset cart
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <CartContext.Provider value={{cart, setCart, addToCart, sendOrder, cartCount}}>
            {children}
        </CartContext.Provider>
    );
}

CartContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};