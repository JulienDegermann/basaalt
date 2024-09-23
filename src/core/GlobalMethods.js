import axiosInstance from '/src/core/AxiosInstance';
import AxiosInstance from './AxiosInstance.js';

export const findUserByEmail = async (author) => {
    try {
        const response = await axiosInstance.get('/api/users?email=' + author.email);
        const user = response.data['hydra:member'].length === 1 ? response.data['hydra:member'][0] : null;
        console.log(response);
        return user;
    } catch (error) {
        console.error(error);
    }
};
export const findStockById = async (id) => {
    try {
        const response = await axiosInstance.get('/api/stocks/' + id);
        console.log(response);
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