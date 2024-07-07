// dependecies
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';

// contexts
import { CartContext } from '../../hooks/useCart.jsx';

// components
import Article from '../../components/Article.jsx';
import Section from '../../components/Section/index.jsx';

function Boutique() {

  // const cart = useContext(CartContext);
  const [articles, setArtciles] = useState([]);

  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const datas = async () => {
      try {
        const request = await axios.get("https://127.0.0.1:8000/api/articles")
        setArtciles(request.data['hydra:member'])
      } catch (e) {
        console.error(e)
      }
    }
    datas()
  }, [])

  return (
    <>
      <Section
        title='La boutique'
        id='shop'
      >

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
      </Section >

    </>
  )
}


export default Boutique;
