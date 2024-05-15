import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useContext } from 'react';
import { CartContext } from '../hooks/CartContext';

export default function Article() {

  const { cart, setCart } = useContext(CartContext);

  const [size, setSize] = useState('');
  const [article, setArticle] = useState({});
  const [stockQuantity, setStockQuantity] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const id = useParams('id').id;

  const [order, setOrder] = useState({ article: article, size: size, quantity: quantity });

  function addToCart() {
    console.log(cart)
    const exist = cart.find( item => item.article === order.article && item.size === order.size);
    if (exist) {
      bv
    }
    setCart(cart => [...cart, { article: article, size: size, quantity: quantity }])
  }



  useEffect(() => {
    axios.get('https://127.0.0.1:8000/api/articles/' + id)
      .then((res) => {
        setArticle(res.data)
        setStockQuantity(res.data.stocks[0].quantity)
        setSize(res.data.stocks[0].size)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [id])

  const quantities = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, '10 et +'
  ]


  useEffect(() => {
    if (article.stocks) {
      const test = Array.from(article.stocks).find(stock => stock.size === size)
      if (test) {
        setStockQuantity(test.quantity)
      }
    }
  }, [article, size])

  useEffect( () => {
    setOrder({ article: article, size: size, quantity: quantity })
  } , [article, size, quantity])

  console.log(order)

  return (
    <section>

      <div className="container">

        <div className="flex">

          {/* <img src={article.image} alt={article.name} /> */}
          <img style={{ maxWidth: "50%", margin: "2rem" }} src="/images/basaalt.png" alt={article.name} />

          <div className="text">
            <h2>{article.name}</h2>
            <p>
              {article.description}
            </p>

            {/* QUANTITY */}
            <FormInput
              name="quantity"
              label='Quantité'
              id="quantity"
              type={quantity === "10 et +" ? "number" : "select"}
              placeholder={quantity === "10 et +" ? "ex : 15" : ""}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {quantities.map((quantity, index) => {
                if (quantity <= stockQuantity) { return <option key={index} value={quantity}>{quantity}</option> }
                if (quantity === "10 et +" && stockQuantity > 10) {
                  return <option key={index} value={quantity}>{quantity}</option>
                }
              })}
            </FormInput>

            {/* SIZE */}
            {article.stocks && <FormInput
              type="select"
              name="size"
              label="Taille"
              defaultValue={size}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {article.stocks.map((stock, index) => {
                if (stock.quantity > 0) {
                  return (
                    <option key={index} value={stock.size}>{stock.size}</option>
                  )
                }
              })}
            </FormInput>}

            {/* ADD TO CART */}
            <Button
              text="Ajouter au panier"
              className="CTA"
              onClick={addToCart}
            />
            <p>
              P.U. : {article.price} €
            </p>

          </div>

        </div>
      </div>
    </section>
  )
}