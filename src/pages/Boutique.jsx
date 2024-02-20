import Title from '../components/Title.jsx'
import { useState, useEffect } from 'react'
import Article from '../components/Article.jsx';
import '../assets/styles/shop.css';


function Boutique() {

  const [articles, setArtciles] = useState([]);

  useEffect(() => {
    setArtciles([
      {
        name: "Chemise",
        category: "Vêtements",
        price: 25.99,
        description: "Chemise en coton à manches longues."
      },
      {
        name: "Ordinateur portable",
        category: "Électronique",
        price: 899.99,
        description: "Ordinateur portable avec processeur rapide et écran HD."
      },
      {
        name: "Livre",
        category: "Livres",
        price: 12.49,
        description: "Roman best-seller de science-fiction."
      },
      {
        name: "Livre",
        category: "Livres",
        price: 12.49,
        description: "Roman best-seller de science-fiction."
      },
      {
        name: "Livre",
        category: "Livres",
        price: 12.49,
        description: "Roman best-seller de science-fiction."
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
                <Article key={index} article={article} />
              ))
            }
          </div>
        </div>
      </section >
    </>
  )
}

export default Boutique;
