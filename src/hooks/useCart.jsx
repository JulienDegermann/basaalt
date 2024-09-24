// dependencies
import PropTypes from 'prop-types';
import {createContext, useState} from 'react';
import AxiosInstance from '../core/AxiosInstance.js';
import {findUserByEmail} from '../core/GlobalMethods.js';

// components
// svgs
// contexts
export const CartContext = createContext({});

export function CartContextProvider({children}) {
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

    const addToCart = e => {
        console.log('add to cart');
        const articleIndex = cart.articleCommands.findIndex(item => item.stock.id === e.stock.id);
        const newCart = {...cart};
        if (articleIndex !== -1) {
            const prevQuantity = parseInt(newCart.articleCommands[articleIndex].quantity);
            newCart.articleCommands[articleIndex].quantity = prevQuantity + e.quantity;
        } else {
            newCart.articleCommands = [...newCart.articleCommands, e];
        }
        return setCart(newCart);
    };

    const removeFromCart = e => {
        console.log('remove from cart');
    };

    const sendOrder = async () => {
        // define buyer
        const user = await findUserByEmail(cart.buyer);
        const buyer = user ? user : cart.buyer;
        console.log(cart);
        cart.buyer = buyer;
        console.log(cart);
        try {
            const response = await new AxiosInstance.post(
                '/api/orders',
                cart,
                {
                    headers:
                        {'Content-Type': 'application/ld+json'}
                });
            console.log(response);
            //     if status 201 : ok -> reset cart
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <CartContext.Provider value={{cart, setCart, addToCart, sendOrder}}>
            {children}
        </CartContext.Provider>
    );
}

CartContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};