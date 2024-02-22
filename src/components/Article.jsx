import PropTypes from 'prop-types';
import { useState } from 'react'
import Button from './Button.jsx';
import ShoppingCart from '../components/svgs/ShoppingCart.jsx';

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
    <div className="shop-card">
      {/* change image */}
      <img src="./images/basaalt.png" alt="image de l'article" />
      <div className="text">
        <div className="flex justify-between">
          <p>{article.name}</p>
          <p>{article.price}</p>

        </div>
        <div className="flex justify-betweens">
          <div className="flex align-center">
            <Button
              text="-"
              className="button flex justify-center align-center"
              onClick={removeArticle}
            />

            <input
              className="input-count"
              type="text"
              inputMode='numeric'
              min="1"
              value={articleCount}
              onChange={(e) => setArticleCount(e.target.value)} />

            <Button
              text="+"
              className="button flex justify-center align-center"
              onClick={addArticle}
            />
          </div>

          <Button onClick={addToCart} text={<ShoppingCart />} className="CTA" />
        </div>

      </div>
    </div>
  )
}

Article.propTypes = {
  article: PropTypes.object.isRequired,
  setCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
}