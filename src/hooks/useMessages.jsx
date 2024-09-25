// dependencies
import {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {ModalContext} from './useModal';
import axiosInstance from '/src/core/AxiosInstance';
import Regex from '/src/core/Regex';
import {findUserByEmail} from '../core/GlobalMethods.js';

export const SendMessageContext = createContext({});

export function SendMessageContextProvider({children}) {
    const {modals, setModals} = useContext(ModalContext);
    // define object pattern
    const [message, setMessage] = useState({
        text: '',
        author: {
            firstName: '',
            lastName: '',
            email: ''
        }
    });
    const [errors, setErrors] = useState({
        text: '',
        author: {
            firstName: '',
            lastName: '',
            email: ''
        }
    });
    const sendMessage = async (message) => {
        try {
            const res = await axiosInstance.post(
                '/api/messages',
                message,
                {
                    headers:
                        {'Content-Type': 'application/ld+json'}
                });
            if (res.status === 201) {
                setErrors({
                    text: '',
                    author: {
                        firstName: '',
                        lastName: '',
                        email: ''
                    }
                });
                setModals([...modals, {
                    type: 'success',
                    text: 'Votre message a bien été envoyé'
                }]);
            }
        } catch (error) {
            const violations = error.response.data.violations;
            const newErrors = {...errors};
            // foreach input, check if there is an error message -> if yes, display it
            newErrors.author.firstName = violations.find((violation) => violation.propertyPath === 'author.firstName') ? violations.find((violation) => violation.propertyPath === 'author.firstName').message : '';
            newErrors.author.lastName = violations.find((violation) => violation.propertyPath === 'author.lastName') ? violations.find((violation) => violation.propertyPath === 'author.lastName').message : '';
            newErrors.author.email = violations.find((violation) => violation.propertyPath === 'author.email') ? violations.find((violation) => violation.propertyPath === 'author.email').message : '';
            newErrors.text = violations.find((violation) => violation.propertyPath === 'text') ? violations.find((violation) => violation.propertyPath === 'text').message : '';
            setErrors(newErrors);
        }
    };
    const verifyDatas = message => {
        const errReg = {...errors};
        // foreach input, check if there is an error message -> if yes, display it
        errReg.author.firstName = Regex({value: message.author.firstName, type: 'name', fieldName: 'Prénom'});
        errReg.author.lastName = Regex({value: message.author.lastName, type: 'name', fieldName: 'Nom'});
        errReg.author.email = Regex({value: message.author.email, type: 'email', fieldName: 'E-mail'});
        errReg.text = Regex({value: message.text, type: 'text', fieldName: 'Message'});
        setErrors(errReg);
        if (errReg.author.firstName || errReg.author.lastName || errReg.author.email || errReg.text) {
            return true;
        }
    };
    const sendMessageResponse = async () => {
        // find user by email if exists
        const user = await findUserByEmail(message.author);
        // create messsage object
        const author = user ? user : message.author;
        const sendingMessage = {
            text: message.text,
            author: author
        };
        // verify datas with front regex
        const regex = verifyDatas(sendingMessage);
        if (regex) {
            return;
        }
        // send message
        sendMessage(sendingMessage);
    };
    const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessageResponse(message);
    };
    return (
        <SendMessageContext.Provider
            value={
                {
                    message,
                    setMessage,
                    errors,
                    setErrors,
                    handleSendMessage
                }
            }>
            {children}
        </SendMessageContext.Provider>
    );
}

SendMessageContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};