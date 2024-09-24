import './styles.css';
import DefaultImage from '/src/assets/images/defaultStockImage.jpg';
import {baseURL} from '../../../core/AxiosInstance.js';
// dependecies
import PropTypes from 'prop-types';
import {useContext, useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import axiosInstance from '/src/core/AxiosInstance';
// contexts
import {CartContext} from '../../../hooks/useCart.jsx';
// components
import Section from '/src/components/Section';
import Button from '/src/components/Button';

export default function ArticleDetail() {
    // get datas : stocks, article from stocks ,cart
    const id = useParams().id;
    const [allStocks, setAllStocks] = useState(null);
    const [article, setArticle] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const {addToCart} = useContext(CartContext);

    // set seclectedStock and its Values
    const [currentStock, setCurrentStock] = useState(null);

    const currentStockSize = useMemo(() => currentStock?.size, [currentStock]);
    const currentStockQuantity = useMemo(() => currentStock?.quantity, [currentStock]);
    const currentStockColor = useMemo(() => currentStock?.color, [currentStock]);
    const currentStockImage = useMemo(() => currentStock?.stockImages[0]?.fileName ? `${baseURL}/uploads/${currentStock?.stockImages[0]?.fileName}` : DefaultImage, [currentStock]);

    const handleClick = async () => {
        addToCart({stock: currentStock, quantity: quantity});
    };

    useEffect(() => {
        const datas = async () => {
            try {
                const response = await axiosInstance.get(`/api/stocks?article=${id}`);
                const datas = response.data['hydra:member'];
                setAllStocks(datas.filter(stock => stock.quantity > 0));
                setArticle(datas[0].article);
                setCurrentStock(datas.find(stock => stock.quantity > 0));
            } catch (error) {
                console.log(error);
            }
        };
        datas();
    }, [id]);

    useEffect(() => {
        if (currentStock?.quantity < quantity) {
            setQuantity(currentStock.quantity);
        }
    }, [currentStock]);

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
                    <img src={currentStockImage} alt="photo de l'article (ou image par défaut)"/>
                </div>
                <div className="text">
                    <h3>Description</h3>
                    <p>{article?.description}</p>
                    <p id="price">{article?.price} € *</p>
                    <p>* Prix unitraire TTC</p>
                    {allStocks?.length > 1 &&
                        <div className="sizes">
                            <h4>Taille</h4>
                            <p>
                                {allStocks?.map(stock => {
                                    return stock.size;
                                }).join(' ,'
                                )}
                            </p>
                        </div>
                    }
                    {allStocks?.length > 1 &&
                        <div className="colors">
                            <h4>Couleur</h4>
                            <div className="colorWrapper">

                                {allStocks?.map((stock, index) => {
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
                        </div>
                    }
                    <div className="addToCart">
                        <div className="quantity">
                            <Button
                                id="decrementQuantity"
                                onClick={() => {
                                    setQuantity(prev => prev > 1 ? prev - 1 : 1);
                                }}
                                className="CTA"
                                text="-"
                            />
                            <p>{quantity}</p>
                            <Button
                                id="incrementQuantity"
                                onClick={() => {
                                    setQuantity(prev => prev + 1 > currentStockQuantity ? prev : prev + 1);
                                }}
                                className="CTA"
                                text="+"
                            />
                        </div>
                        <Button
                            id="saveToCart"
                            onClick={handleClick}
                            text="Ajouter au panier"
                            className="CTA"
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}
ArticleDetail.propTypes = {
    id: PropTypes.string,
};