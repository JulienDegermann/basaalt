// dependecies
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

// contexts
import { CartContext } from '../hooks/CartContext';

// components
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import image from '/images/basaalt.png'

export default function Article() {

  const { cart, setCart } = useContext(CartContext);
  const [allStocks, setAllStocks] = useState([]);
  const [defaultStock, setDefaultStock] = useState({})
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [article, setArticle] = useState({});
  const [stockQuantity, setStockQuantity] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const quantities = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, "10 et +"
  ]
  const id = useParams('id').id;
  const [order, setOrder] = useState({ article: article, size: size, quantity: quantity, color: color });

  useEffect(() => {
    // FIRST RENDER : LOAD ARTICLE AND ALL STOCKS

    // get article datas
    const getDatas = async () => {
      try {
        const res = await axios.get('https://127.0.0.1:8000/api/articles/' + id)
        // return res.data.stocks = res.data.stocks.filter(stock => stock.quantity > 0)
        setArticle(res.data)
        const datas = res.data.stocks.filter(stock => stock.quantity > 0)
        setAllStocks(datas)
        setDefaultStock(datas[0])
        setColor(datas[0].color)
        setSize(datas[0].size)
      } catch (e) {
        // save error in logs
        console.log(e)
      }
    }
    getDatas()
  }, [id])

  useEffect(() => {
    const stock = allStocks.find(stock => stock.size === size && stock.color === color)
    if (stock) {
      setStockQuantity(stock.quantity)
    } else {
      setStockQuantity(0)
    }
  }, [color, size])

  useEffect(() => {
    setOrder({ article: article, size: size, quantity: quantity, color: color })
  }, [article, size, quantity, color])


  function handleColor(e) {
    setColor(e.target.value)
    setDefaultStock(article.stocks.filter(stock => stock.color === e.target.value))
  }

  function handleSize(e) {
    setSize(e.target.value)
    setDefaultStock(article.stocks.filter(stock => stock.size === e.target.value))
  }

  function addToCart() {
    const exist = cart.find(item => item.article === article && item.size === size);
    if (exist) {
      exist.quantity += parseInt(quantity)
    } else {
      setCart([...cart, { article: article, size: size, quantity: quantity }])
    }
  }

  return (
    <section>
      <div className="container">
        <div className="flex">
          {/* <img src={article.image} alt={article.name} /> */}
          <img style={{ maxWidth: "50%", margin: "2rem" }} src={image} alt={article.name} />
          <div className="text">
            <h2>{article.name}</h2>
            <p>
              {article.description}
            </p>

            {/* QUANTITY */}
            {stockQuantity === 0 && <p className="sold-out">Indisponible</p>}
            {stockQuantity > 0 && (
              <FormInput
                name="quantity"
                label='Quantité'
                id="quantity"
                type={quantity === "10 et +" ? "number" : "select"}
                placeholder={quantity === "10 et +" ? "ex : 15" : ""}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                {
                  stockQuantity === 0 && <option value="" selected disabled>Indisponible</option>
                }
                {stockQuantity > 0 && quantities.map((quantity, index) => {
                  if (stockQuantity === 0) {
                    return <option key={index} value={quantity} disabled>{quantity}</option>
                  }
                  if (quantity <= stockQuantity) {
                    return <option key={index} value={quantity}>{quantity}</option>
                  }
                  if (quantity === "10 et +" && stockQuantity > 10) {
                    return <option key={index} value={quantity}>{quantity}</option>
                  }
                })
                }
              </FormInput>)}

            {/* SIZE */}


            {article.stocks && <FormInput
              type="select"
              name="size"
              label="Taille"
              defaultValue={size}
              value={size}
              onChange={handleSize}
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
                onChange={handleColor}
                key={index}
              />

            )}

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
    </section >
  )
}