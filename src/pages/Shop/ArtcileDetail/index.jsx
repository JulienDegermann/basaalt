// dependecies
import PropTypes from 'prop-types';
import {useContext, useEffect, useMemo, useState} from 'react';
import './styles.css';
import Section from '/src/components/Section';
import Button from '/src/components/Button';
import {useParams} from 'react-router-dom';
import axiosInstance, {baseURL} from '/src/core/AxiosInstance';
import {CartContext} from '../../../hooks/useCart.jsx';

export default function ArticleDetail() {
    const id = useParams().id;
    const [article, setArticle] = useState(null);
    const [currentStock, setCurrentStock] = useState();
    const image = useMemo(() => currentStock?.stockImages[0].fileName, [currentStock]);
    const {cart, addToCart} = useContext(CartContext);
    console.log(cart);
    const handleClick = async () => {
        const thisStock = '/api/stocks/' + currentStock.id;

        addToCart({stock: currentStock, quantity: 2});
    };
    useEffect(() => {
        const datas = async () => {
            try {
                const response = await axiosInstance.get(`/api/articles/${id}`);
                const data = response.data;
                setArticle(data);
                setCurrentStock(data.stocks[0]);
            } catch (error) {
                console.log(error);
            }
        };
        datas();
    }, [id]);
    return (
        <Section
            id="articleDetail"
            title={article ? article.name : 'Chargement en cours'}
        >

            <Button
                className="link"
                onClick={() => window.history.back()}
                text="Retour"
                ariaLabel="Retourner à la page précédente"
            />

            <div className="flex">

                <div className="images">

                    <img src={`${baseURL}/uploads/${image}`} alt="text atlernatif"/>
                    {/* <img src={Image} alt="" /> */}
                </div>
                <div className="text">

                    <h3>Description</h3>

                    {article &&
                        <>
                            {article.stocks.length > 1 &&
                                <p>
                                    Tailles : {article?.stocks?.map(stock => {
                                    return stock.size;
                                }).join(' ,'
                                )}
                                </p>
                            }
                            {article.stocks.length > 1 &&
                                < div className="colorWrapper">
                                    Couleurs :
                                    {article?.stocks?.map((stock, index) => {
                                        return <div
                                            key={index}
                                            value={stock.color}
                                            className={stock === currentStock ? 'selected' : ''}
                                            style={{
                                                backgroundColor: stock.color,
                                            }}
                                            onClick={() => {
                                                setCurrentStock(stock);
                                            }}
                                        >
                                        </div>;
                                    })}
                                </div>
                            }
                            <p id="price">{article.price} € *</p>

                            {/* {article.stocks.map(stock => {
              return <p>Couleur: {stock.color} / Taille : {stock.size} / Quantité {stock.quantity}</p>
            })} */}
                            <Button
                                id="sendOrder"
                                onClick={handleClick}
                                text="Ajouter au panier"
                                className="CTA"
                            />
                        </>
                    }
                </div>
            </div>
        </Section>
    );
}
ArticleDetail.propTypes = {
    id: PropTypes.string,
};