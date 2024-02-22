import Title from '../components/Title.jsx'
import { useState, useEffect, useContext } from 'react'
import Article from '../components/Article.jsx';
import '../assets/styles/shop.css';
import { CartContext } from '../hooks/CartContext.jsx';

function Boutique() {


  // const cart = useContext(CartContext);
  const [articles, setArtciles] = useState([]);

  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    setArtciles([
      {
        name: "Chemise",
        category: "Vêtements",
        price: 25.99,
        description: "Chemise en coton à manches longues.",
        id: 1,
        quantity: 1
      },
      {
        name: "Ordinateur portable",
        category: "Électronique",
        price: 899.99,
        description: "Ordinateur portable avec processeur rapide et écran HD.",
        id: 2,
        quantity: 1
      },
      {
        name: "Livre",
        category: "Livres",
        price: 12.49,
        description: "Roman best-seller de science-fiction.",
        id: 3,
        quantity: 1
      },
      {
        name: "Livre",
        category: "Livres",
        price: 12.49,
        description: "Roman best-seller de science-fiction.",
        id: 4,
        quantity: 1
      },
      {
        name: "Livre",
        category: "Livres",
        price: 12.49,
        description: "Roman best-seller de science-fiction.",
        id: 5,
        quantity: 1
      }
    ])
  }, [])

  return (
    <>
      <section>
        <div className="container">
          <Title text="La Boutique" />

          <div className="grid shop">
            {
              articles.map((article, index) => (
                <Article key={index} article={article} setCart={setCart} cart={cart} />
              ))
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Boutique;
