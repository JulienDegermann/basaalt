// dependecies
import { useContext } from 'react';

// contexts
import { CartContext } from '../hooks/useCart';

// components
import Section from '../components/Section';

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  let totalCost = 0
  cart.map((article) => {
    totalCost += article.price * article.quantity;

  })
  totalCost = (Math.round(totalCost * 100)) / 100;
  return (
    <>
      <Section
        id='cart'
        title='Mon panier'
      >
        <div className="cart-content">
          <div className="flex col">
            {
              cart.map((article, index) => (
                <div key={index} className="cart-item">
                  <h4>{article.name}</h4>
                  <div className="flex justify-between">
                    <p>{article.quantity} x {article.price}€</p>
                    <p>{(Math.round(article.quantity * article.price * 100)) / 100} €</p>
                  </div>
                </div>
              ))
            }
          </div>

          <div className='cart-total flex align-center'>
            <p>total : {`${totalCost} €`}</p>
          </div>
        </div>

      </Section>






    </>
  )
}

export default Cart;
