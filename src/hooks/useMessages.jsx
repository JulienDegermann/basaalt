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
    const [message, setMessage] = useState({});
    const [messageErrors, setMessageErrors] = useState({
        text: '',
        user: {
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
                setMessage({});
                setModals([...modals, {
                    type: 'success',
                    text: 'Votre message a bien été envoyé'
                }]);
            }
        } catch (error) {
            const violations = error.response.data.violations;
            const newErrors = {...messageErrors};
            // foreach input, check if there is an error message -> if yes, display it
            newErrors.user.firstName = violations.find((violation) => violation.propertyPath === 'author.firstName') ? violations.find((violation) => violation.propertyPath === 'author.firstName').message : '';
            newErrors.user.lastName = violations.find((violation) => violation.propertyPath === 'author.lastName') ? violations.find((violation) => violation.propertyPath === 'author.lastName').message : '';
            newErrors.user.email = violations.find((violation) => violation.propertyPath === 'author.email') ? violations.find((violation) => violation.propertyPath === 'author.email').message : '';
            newErrors.text = violations.find((violation) => violation.propertyPath === 'text') ? violations.find((violation) => violation.propertyPath === 'text').message : '';
            setMessage(newErrors);
        }
    };

    const verifyDatas = message => {
        const errReg = {...messageErrors};
        // foreach input, check if there is an error message -> if yes, display it

        const testFirstName = message?.author?.firstName ? message.author.firstName : null;
        const testLastName = message?.author?.lastName ? message.author.lastName : null;
        const testEmail = message?.author?.firstName ? message.author.email : null;
        const testText = message?.text ? message.text : null;

        errReg.user.firstName = Regex({value: testFirstName, type: 'name', fieldName: 'Prénom'});
        errReg.user.lastName = Regex({value: testLastName, type: 'name', fieldName: 'Nom'});
        errReg.user.email = Regex({value: testEmail, type: 'email', fieldName: 'E-mail'});
        errReg.text = Regex({value: testText, type: 'text', fieldName: 'Message'});
        setMessageErrors(errReg);
        if (errReg.user.firstName || errReg.user.lastName || errReg.user.email || errReg.text) {
            return true;
        }
    };

    const sendMessageResponse = async (message) => {
        // find user by email if exists
        const foundUser = await findUserByEmail(message.user);
        // create messsage object
        const user = foundUser ? foundUser : message?.user ? message.user : null;
        const sendingMessage = {
            text: message.text ? message.text : null,
            author: user
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
                    messageErrors,
                    setMessageErrors,
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