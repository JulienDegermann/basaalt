// dependecies
import PropTypes from 'prop-types';
import { useContext, useState } from 'react'
import './styles.css';
import Image from '/src/assets/images/heroBanner.jpg';

// components
import { NavLink } from 'react-router-dom';

// contexts
import { ShopContext } from '/src/hooks/useShop';

export default function ShopCard({ article, cart, setCart }) {
  const [articleCount, setArticleCount] = useState(1);

  function removeArticle() {
    articleCount > 1 ? setArticleCount(parseInt(articleCount) - 1) : setArticleCount(articleCount);
  }
  function addArticle() {
    setArticleCount(parseInt(articleCount) + 1);
  }

  function addToCart() {

    let newCart = [...cart];

    for (let i = 0; i < articleCount; i++) {
      if (newCart.some(e => e.id === article.id)) {
        newCart.find(e => e.id === article.id).quantity++;
      } else {
        newCart.push(article);
      }
    }

    setArticleCount(1);
    setCart(newCart);
  }

  return (
    <NavLink to={`/la-boutique/${article.id}`} className="shop-card">
      {/* <div className="shop-card"> */}
      {/* change image */}
      {/* <img src="./images/basaalt.png" alt="image de l'article" /> */}
      <img src={Image} alt="image de l'article" />
      <div className="text">
        <p>{article.name}</p>
        <p>{article.price} €</p>
      </div>
      {/* </div> */}
    </NavLink>
  )
}

ShopCard.propTypes = {
  article: PropTypes.object.isRequired,
  setCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
}