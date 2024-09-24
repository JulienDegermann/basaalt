// dependecies
import PropTypes from 'prop-types';
import {useMemo} from 'react';
import './styles.css';
import {baseURL} from '/src/core/AxiosInstance';
import DefaultImage from '/src/assets/images/defaultStockImage.jpg';
// components
import {NavLink} from 'react-router-dom';
// contexts
export default function ShopCard({article}) {
    const stock = useMemo(() => article?.stocks[0], [article]);
    const image = useMemo(() => stock?.stockImages[0]?.fileName ? `${baseURL}/uploads/${stock?.stockImages[0]?.fileName}` : DefaultImage, [stock]);
    return (
        <NavLink to={`/la-boutique/${article.id}`} className="shop-card">
            <img src={image} alt="text atlernatif"/>
            <div className="text">
                <p>{article.name}</p>
                <p>{article.price} €</p>
            </div>
        </NavLink>
    );
}
ShopCard.propTypes = {
    article: PropTypes.object.isRequired,
};