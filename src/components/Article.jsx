import PropTypes from 'prop-types';
import { useState } from 'react'
import Button from './Button.jsx';
import ShoppingCart from '../components/svgs/ShoppingCart.jsx';

export default function Article({ article }) {
  const [articleCount, setArticleCount] = useState(1);

  function removeArticle() {
    console.log('coucou')

    articleCount > 1 ? setArticleCount(parseInt(articleCount) - 1) : setArticleCount(articleCount);
  }
  function addArticle() {
    console.log('coucou')
    setArticleCount(parseInt(articleCount) + 1);
  }

  return (
    <div className="shop-card">
      {/* change image */}
      <img src="./images/basaalt.png" alt="" />
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
              readOnly
              min="1"
              value={articleCount}
              onChange={(e) => setArticleCount(e.target.value)} />

            <Button
              text="+"
              className="button flex justify-center align-center"
              onClick={addArticle}
            />
          </div>

          <Button onClick={addArticle} text={<ShoppingCart />} className="CTA"/>
        </div>

      </div>
    </div>
  )
}

Article.propTypes = {
  article: PropTypes.object.isRequired
}