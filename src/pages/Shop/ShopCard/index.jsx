// dependecies
import PropTypes from 'prop-types';
import { useMemo } from 'react'
import './styles.css';
import { baseURL } from '/src/core/AxiosInstance';



// components
import { NavLink } from 'react-router-dom';

// contexts
import { ShopContext } from '/src/hooks/useShop';

export default function ShopCard({ article}) {

  const stock = useMemo(() => article?.stocks[0], [article]);
  console.log(article)

  const image = useMemo(() => stock?.stockImages[0].fileName ? stock?.stockImages[0]?.fileName : 'bonjour', [stock]);



  return (
    <NavLink to={`/la-boutique/${article.id}`} className="shop-card">
      <img src={`${baseURL}/uploads/${image}`} alt="text atlernatif" />
      <div className="text">
        <p>{article.name}</p>
        <p>{article.price} €</p>
      </div>
    </NavLink>
  )
}

ShopCard.propTypes = {
  article: PropTypes.object.isRequired,
}