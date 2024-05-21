import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useContext } from 'react';
import { CartContext } from '../hooks/CartContext';

export default function Article() {

  const { cart, setCart } = useContext(CartContext);
  const [allStocks, setAllStocks] = useState([]);
  const defaultStock = allStocks[0];
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [article, setArticle] = useState({});
  const [stockQuantity, setStockQuantity] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const quantities = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, "10 et +"
  ]
  const id = useParams('id').id;
  const [order, setOrder] = useState({ article: article, size: size, quantity: quantity });

  // function addToCart() {
  //   console.log(cart)
  //   const exist = cart.find( item => item.article === order.article && item.size === order.size);
  //   if (exist) {
  //     bv
  //   }
  //   setCart(cart => [...cart, { article: article, size: size, quantity: quantity }])
  // }

  useEffect(() => {
    // get article datas
    const getDatas = async () => {
      try {
        const res = await axios.get('https://127.0.0.1:8000/api/articles/' + id)
        // return res.data.stocks = res.data.stocks.filter(stock => stock.quantity > 0)

        setArticle(res.data)
        const allStocks = res.data.stocks.filter(stock => {
          if (size && color) {
            return (stock.quantity > 0 && stock.size === size || stock.color === color)
          } else {
            return (stock.quantity > 0)
          }
        })
        setAllStocks(allStocks)

        console.log(`color : ${color} size : ${size}`)
        console.log(allStocks)
        const defaultStock = allStocks.find(stock => stock.quantity > 0)

        setStockQuantity(defaultStock.quantity)
        setColor(defaultStock.color)
        setSize(defaultStock.size)

      } catch (e) {
        // save error in logs
        console.log(e)
      }
    }
    getDatas()
  }, [id, size, color, stockQuantity])

  useEffect(() => {
    setOrder({ article: article, size: size, quantity: quantity, color: color })
  }, [article, size, quantity, color])


  function changeColor(e) {
    setColor(e.target.value)
    setAllStocks(article.stocks.filter(stock => stock.color === e.target.value))
  }


  function changeSize(e) {
    setSize(e.target.value)
  }

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
              onChange={changeSize}
            >
              {article.stocks.map((stock, index) => {
                if (stock.quantity > 0) {
                  return (
                    <option key={index} value={stock.size}>{stock.size}</option>
                  )
                }
              })}
            </FormInput>}

            {/* COLOR */}
            {article.stocks && article.stocks.map((stock, index) =>
              <FormInput
                name="color"
                type="radio"
                label={stock.color}
                // id={stock.color}
                value={color}
                onChange={changeColor}
                key={index}
              />

            )}

            {/* ADD TO CART */}
            < Button
              text="Ajouter au panier"
              className="CTA"
            // onClick={addToCart}
            />
            <p>
              P.U. : {article.price} €
            </p>

          </div>

        </div>
      </div>
    </section >
  )
}