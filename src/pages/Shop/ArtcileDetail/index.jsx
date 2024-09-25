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
import FormInput from '../../../components/FormInput.jsx';

export default function ArticleDetail() {

    // get datas : stocks, article from stocks ,cart
    const id = useParams().id;
    const [allStocks, setAllStocks] = useState(null);
    const article = useMemo(() => allStocks ? allStocks[0].article : null, [allStocks]);

    // set seclectedStock and its Values
    const [quantity, setQuantity] = useState(1);
    const [selectedStock, setSelectedStock] = useState(null);

    const selectedStockSize = useMemo(() => selectedStock?.size, [selectedStock]);
    const selectedStockQuantity = useMemo(() => selectedStock?.quantity, [selectedStock]);
    const selectedStockColor = useMemo(() => selectedStock?.color, [selectedStock]);
    const selectedStockImage = useMemo(() => selectedStock?.stockImages[0]?.fileName ? `${baseURL}/uploads/${selectedStock?.stockImages[0]?.fileName}` : DefaultImage, [selectedStock]);

    // available colors and sizes
    const availableStockColors = useMemo(() => {
        const values = [];
        allStocks?.map(stock => {
            if (!values.includes(stock.color)) {
                values.push(stock.color);
            }
        });
        return values;
    }, [allStocks]);

    // const availableStockSizes = useMemo(() => allStocks?.filter(stock => stock.color === selectedStockColor), [selectedStockColor, allStocks]);

    const availableStockSizes = useMemo(() => {
        const sizes = [];
        // console.log(sizes);
        const stocks = allStocks?.filter(stock => stock.color === selectedStockColor);
        stocks?.map(stock => {
            if (stock.size) {
                sizes.push(stock.size);
            }
        });
        console.log(sizes);
        return sizes;
    }, [selectedStockColor]);

    const {addToCart} = useContext(CartContext);

    const handleClick = async () => {
        addToCart({stock: selectedStock, quantity: quantity});
    };

    useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await axiosInstance.get(`/api/stocks?article=${id}`);
                const datas = response.data['hydra:member'];
                setAllStocks(datas.filter(stock => stock.quantity > 0));
                setSelectedStock(datas.find(stock => stock.quantity > 0));
            } catch (error) {
                console.log(error);
            }
        };
        getArticle();
    }, [id]);

    useEffect(() => {
        if (selectedStock?.quantity < quantity) {
            setQuantity(selectedStock.quantity);
        }
    }, [selectedStock]);

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
                    <img src={selectedStockImage} alt="photo de l'article (ou image par défaut)"/>
                </div>
                <div className="text">
                    <h3>Description</h3>
                    <p>{article?.description}</p>
                    <p id="price">{article?.price} € *</p>
                    <p>* Prix unitraire TTC</p>
                    {allStocks?.length > 1 &&
                        <div className="colors">
                            <h4>Couleur</h4>
                            <div className="colorWrapper">

                                {availableStockColors?.map((color, index) => {
                                    return <div
                                        key={index}
                                        value={color}
                                        className={color === selectedStock.color ? 'selected' : ''}
                                        style={{
                                            backgroundColor: color,
                                        }}
                                        onClick={() => {
                                            setSelectedStock(allStocks.find(stock => stock.color === color));
                                        }}
                                    >
                                    </div>;
                                })}
                            </div>
                        </div>
                    }
                    {availableStockSizes.length > 0 && <FormInput
                        type="select"
                        id="sizeSelect"
                        name="sizeSelect"
                        label="Taille "
                        onChange={e => setSelectedStock(allStocks.find(stock => stock.color === selectedStockColor && stock.size === e.target.value))}
                    >
                        {availableStockSizes?.map((size, index) =>
                            <option key={index} value={size}>{size}</option>
                        )}
                    </FormInput>}


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
                                    setQuantity(prev => prev + 1 > selectedStockQuantity ? prev : prev + 1);
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