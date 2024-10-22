// styles
// import './styles.css';

// dependencies
import {useContext} from 'react';

// contexts
import {SendMessageContext} from '../../hooks/useMessages';

// components
import Button from '../../components/Button';
import Section from '../../components/Section';
import UserForm from '../../components/UserForm/index.jsx';

function Contact() {

    const {message, setMessage, messageErrors, handleSendMessage} = useContext(SendMessageContext);

    return (
        <>
            <Section
                id="contact"
                title="Contact"
            >
                <form
                    action=""
                    method="POST"
                >
                    <UserForm isMessage={true}/>
                    <Button
                        text="Envoyer"
                        className="CTA button"
                        onClick={(e) => handleSendMessage(e, message)}
                        ariaLanbel="Envoyer le message"
                    />
                </form>
            </Section>
        </>
    );
}

export default Contact;
