import axiosInstance from '/src/core/AxiosInstance';
import AxiosInstance from './AxiosInstance.js';

export const findUserByEmail = async (user) => {
    if (!user) {
        return null;
    }
    try {
        const response = await axiosInstance.get('/api/users?email=' + user.email);
        const data = response.data['hydra:member'].length === 1 ? response.data['hydra:member'][0] : null;
        return data;
    } catch (error) {
        console.error(error);
    }
};
export const findStockById = async (id) => {
    try {
        const response = await axiosInstance.get('/api/stocks/' + id);
        // const stock = response.data['hydra:member'].length === 1 ? response.data['hydra:member'][0] : null;
        const stock = response.data;
        return stock;
    } catch (error) {
        console.error(error);
    }
};

export const addNewArticleCommand = async (articleCommand) => {
    try {
        const response = await axiosInstance.post('/api/stocks', articleCommand, {
            headers:
                {'Content-Type': 'application/ld+json'}
        });
        return response.data;

    } catch (e) {
        console.log(e);
    }
};

export const addNewOrder = async (order) => {
    try {
        const response = await new AxiosInstance.post(
            '/api/orders',
            order,
            {
                headers:
                    {'Content-Type': 'application/ld+json'}
            });
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const findStocksById = async (articleCommands) => {
    const stockIds = [];
    articleCommands.map(articleCommand => (stockIds.push(articleCommand.stock.id)));
    const searchParams = new URLSearchParams({id: stockIds});

    try {
        const response = await new AxiosInstance.get('/api/stocks', searchParams.toString());
        const stocks = response.data['hydra:member'];
        return stocks;
    } catch (e) {
        console.log(e);
    }

};