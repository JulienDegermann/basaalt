// styles
import './styles.css'

// dependecies
import { useContext } from 'react'

// contexts
import { CartContext } from '/src/hooks/useCart';

// components
import Section from '/src/components/Section';
import ShopCard from './ShopCard';
import { ShopContext } from '/src/hooks/useShop';

export default function Shop() {
  const articles = useContext(ShopContext);
  const { cart, setCart } = useContext(CartContext);
  return (
    <>
      <Section
        title='La boutique'
        id='shop'
      >
        <div className="grid">
          {
            articles.map((article, index) => {
              if (article.stocks.length != 0) {
                return (
                  <ShopCard
                    key={index}
                    article={article}
                    setCart={setCart}
                    cart={cart}
                  />
                )
              }
            })
          }
        </div>
      </Section >
    </>
  )
}



