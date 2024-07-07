// dependecies
import PropTypes from 'prop-types';
import { useState } from 'react'

// components
import { NavLink } from 'react-router-dom';

export default function Article({ article, cart, setCart }) {
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
        <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image de l'article" />
        <div className="text">
          <p>{article.name}</p>
          <p>{article.price} €</p>
        </div>
      {/* </div> */}
    </NavLink>
  )
}

Article.propTypes = {
  article: PropTypes.object.isRequired,
  setCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
}