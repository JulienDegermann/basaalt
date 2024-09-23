// styles
import './styles.css';

// dependecies
import { useContext } from 'react';

// components
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import Section from '../../components/Section';
import { SendMessageContext } from '../../hooks/useMessages';

function Contact() {

  const { message, setMessage, errors, handleSendMessage } = useContext(SendMessageContext);
  return (
    <>
      <Section
        id='contact'
        title='Contact'
      >
        <form
          action=""
          method="POST"
        >
          <FormInput
            type="text"
            name="firstName"
            label="Prénom"
            placeholder='Entrez votre prénom'
            error={errors.author.firstName ? errors.author.firstName : ''}
            onChange={e => { setMessage({ ...message, author: { ...message.author, firstName: e.target.value } }) }}
          />
          <FormInput
            type="text"
            name="lastName"
            label="Nom"
            placeholder='Entrez votre nom'
            error={errors.author.lastName ? errors.author.lastName : ''}
            onChange={(e) => setMessage({ ...message, author: { ...message.author, lastName: e.target.value } })
            }
          />
          <FormInput
            type="email"
            name="email"
            label="E-mail" 
            error={errors.author.email ? errors.author.email : ''}
            placeholder='Entrez votre e-mail'
            onChange={(e) => setMessage({ ...message, author: { ...message.author, email: e.target.value } })}
          />
          <FormInput
            type="textarea"
            name="message"
            label="Message"
            placeholder='Écrivez votre message ici'
            error={errors.text ? errors.text : ''}
            onChange={(e) => setMessage({ ...message, text: e.target.value })}

          />
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
