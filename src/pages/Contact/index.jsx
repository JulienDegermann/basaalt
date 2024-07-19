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

  const { message, getMessages, setMessage, errors, handleSendMessage } = useContext(SendMessageContext);
  // display messages
  // useEffect(() => {
  //   const datas = async () => {
  //     try {
  //       const res = await axios.get("https://127.0.0.1:8000/api/messages")
  //       setMessages(res.data['hydra:member'])
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }
  //   datas()
  // }, [messageDatas]);

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
            onChange={(e) => setMessage({ ...message, author: { ...message.author, firstName: e.target.value } })
            }
          />
          {errors.author.firstName && <p className="error">{errors.author.firstName}</p>}
          <FormInput
            type="text"
            name="lastName"
            label="Nom"
            placeholder='Entrez votre nom'
            onChange={(e) => setMessage({ ...message, author: { ...message.author, lastName: e.target.value } })
            }
          />
          {errors.author.lastName && <p className="error">{errors.author.lastName}</p>}
          <FormInput
            type="email"
            name="email"
            label="E-mail"
            placeholder='Entrez votre e-mail'
            onChange={(e) => setMessage({ ...message, author: { ...message.author, email: e.target.value } })}
          />
          {errors.author.email && <p className="error">{errors.author.email}</p>}
          <FormInput
            type="textarea"
            name="message"
            label="Message"
            placeholder='Écrivez votre message ici'
            onChange={(e) => setMessage({ ...message, text: e.target.value })}

          />
          {errors.text && <p className="error">{errors.text}</p>}
          <Button
            text="Envoyer"
            className="CTA button"
            onClick={(e) => handleSendMessage(e, message)}
          />
        </form>
      </Section>
    </>
  );
}

export default Contact;
