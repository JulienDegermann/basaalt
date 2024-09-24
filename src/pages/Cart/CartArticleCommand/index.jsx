import PropTypes from 'prop-types';
import './styles.css';
import DefaultImage from '/src/assets/images/defaultStockImage.jpg';
import {useMemo} from 'react';
import {baseURL} from '../../../core/AxiosInstance.js';

export default function CartArticleCommand({articleCommand}) {
    console.log(articleCommand);

    const Image = useMemo(() => articleCommand?.stock?.stockImages[0]?.fileName ? `${baseURL}/uploads/${articleCommand?.stock?.stockImages[0]?.fileName}` : DefaultImage, [articleCommand]);

    // const Image = articleCommand.stock.stockImages[0] ? articleCommand.stock.stockImages[0] : DefaultImage;
    // console.log(Image);
    return (
        <div className="cart-item">
            <img src={Image} alt="image de l'article"/>
            <div className="text">
                <p>{articleCommand.stock.article.name} (Qté : {articleCommand.quantity}, PU
                    : {articleCommand.stock.article.price}€)
                </p>
                <p className="bold">{(Math.round(articleCommand.quantity * articleCommand.stock.article.price * 100)) / 100} €</p>
            </div>

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