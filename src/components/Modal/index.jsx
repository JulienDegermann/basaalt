import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';

export default function Modal({type, text}) {

    const [status, setStatus] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setStatus(false);
        }, 5000);
    }, []);

    if (status) {
        return (
            <div className={`modal ${type}`}>
                <button onClick={() => {
                    setStatus(false);
                }}>x
                </button>

                {text}
            </div>
        );
    }
}

Modal.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};