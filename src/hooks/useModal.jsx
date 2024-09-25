// dependencies
import {createContext, useState} from 'react';
import PropTypes from 'prop-types';
import Modal from '../components/Modal/index.jsx';

export const ModalContext = createContext('');

export default function ModalContextProvider(
    {children}
) {
    const [status, setStatus] = useState(true);
    const [modals, setModals] = useState([]);

    return (
        <ModalContext.Provider
            value={{
                status,
                setStatus,
                modals,
                setModals
            }}>
            <div className="modalContainer">

                {modals.map((modal, i) => {
                    console.log(modal);

                    return (<Modal
                            key={i}
                            type={modal.type}
                            text={modal.text}
                        />
                    );
                })}
            </div>
            {children}
        </ModalContext.Provider>
    );
}

ModalContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};