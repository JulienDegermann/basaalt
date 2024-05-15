import Title from '../components/Title.jsx'
import { useState, useEffect, useContext } from 'react'
import Article from '../components/Article.jsx';
import '../assets/styles/shop.css';
import { CartContext } from '../hooks/CartContext.jsx';
import axios from 'axios';

function Boutique() {


  // const cart = useContext(CartContext);
  const [articles, setArtciles] = useState([]);

  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("https://127.0.0.1:8000/api/articles")
      .then(response => {
        setArtciles(response.data['hydra:member'])
      })
      .catch(error => {
        console.error('Error fetching data: ', error)
      })
  }, [])

  return (
    <>
      <section>
        <div className="container">
          <Title text="La Boutique" />

          <div className="grid shop">
            {
              articles.map((article, index) => {
                if (article.stocks.length != 0) {
                  return (
                    <Article
                      key={index}
                      article={article}
                      setCart={setCart}
                      cart={cart} />

                  )
                }
              })
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Boutique;
