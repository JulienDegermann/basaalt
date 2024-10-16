import PropTypes from 'prop-types';
import './styles.css';
import DefaultImage from '/src/assets/images/defaultStockImage.webp';
import {useContext, useMemo} from 'react';
import {baseURL} from '../../../core/AxiosInstance.js';
import {CartContext} from '../../../hooks/useCart.jsx';

export default function CartArticleCommand({articleCommand}) {
    const {cart, setCart} = useContext(CartContext);
    const Image = useMemo(() => articleCommand?.stock?.stockImages[0]?.fileName ? `${baseURL}/uploads/${articleCommand?.stock?.stockImages[0]?.fileName}` : DefaultImage, [articleCommand]);
    const size = articleCommand.stock.size ? articleCommand.stock.size : null;

    const deleteFromCart = () => {
        const newCart = {...cart};
        const itemIndex = newCart.articleCommands.findIndex(item => item === articleCommand);
        newCart.articleCommands.splice(itemIndex, 1);
        setCart(newCart);
    };

    return (
        <div className="cart-item">
            <img src={Image} alt="image de l'article"/>
            <div className="text">
                <p>{articleCommand.stock.article.name} {size && `(taille : ${size})`}</p>
                <p className="info">Quantité : {articleCommand.quantity} <br/>
                    Prix Unitaire : {articleCommand.stock.article.price}€
                </p>
                <p className="bold">{(Math.round(articleCommand.quantity * articleCommand.stock.article.price * 100)) / 100} €</p>
            </div>

            <button
                className="trash"
                onClick={() => deleteFromCart()}
                aria-label="Supprimer du panier"
            >
            </button>

        </div>
    );
}

CartArticleCommand.propTypes = {
    articleCommand: PropTypes.shape({
            quantity: PropTypes.number.isRequired,
            stock: PropTypes.object.isRequired
        }
    ).isRequired
};