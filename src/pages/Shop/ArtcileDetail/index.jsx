// dependecies
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import './styles.css';
import Section from '/src/components/Section';
import Button from '/src/components/Button';
import { useParams } from 'react-router-dom';
import FormInput from '/src/components/FormInput';
import Image from '/src/assets/images/heroBanner.jpg';
import axiosInstance from '../../../core/AxiosInstance';




export default function ArticleDetail() {
  const id = useParams().id;
  const [article, setArticle] = useState(null);

  const [stock, setStock] = useState(null);

  useEffect(() => {
    const datas = async () => {
      try {
        const response = await axiosInstance.get(`/api/articles/${id}`);
        const data = response.data;
        setArticle(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    datas();
  }, [id])

  useEffect(() => {
  })
  
  return (

    <Section
      id="articleDetail"
      title={article ? article.name : 'Chargement en cours'}
    >

      <Button
        className='link'
        onClick={() => window.history.back()}
        text='Retour'
      />

      <div className="flex">

        <div className="images">
          <img src={Image} alt="" />
        </div>
        <div className="text">

          <h3>Description</h3>

          {article &&
            <>
              <p>
                Tailles : {article.stocks.map(stock => { return stock.size }).join(' ,'
                )}
              </p>
              <div className='colorWrapper'>
                Couleurs :
                {article.stocks.map((stock, index) => {
                  return <div
                    key={index}
                    value={stock.color}
                    style={{ backgroundColor: stock.color }}
                  >
                  </div>
                })}
              </div>
              <p id="price">{article.price} € *</p>

              {/* {article.stocks.map(stock => {
              return <p>Couleur: {stock.color} / Taille : {stock.size} / Quantité {stock.quantity}</p>
            })} */}
            </>
          }
        </div>
      </div>
    </Section>
  )
}

ArticleDetail.propTypes = {
  id: PropTypes.string,
}