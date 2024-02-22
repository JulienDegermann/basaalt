import '../assets/styles/cart.css';
import Title from '../components/Title';
import { useContext, useState } from 'react';
import { CartContext } from '../hooks/CartContext';

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  let totalCost = 0
  cart.map((article) => {
    totalCost += article.price * article.quantity;

  })
  totalCost = (Math.round(totalCost * 100)) / 100;
  return (
    <>
      <section>
        <div className="container cart-content">

          <Title level="3" text="Mon panier" />
          <div className="flex col">
            {
              cart.map((article, index) => (
                <div key={index} className="cart-item">
                  <Title level="4" text={article.name} />
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
    </section >

    </>
  )
}

export default Cart;
