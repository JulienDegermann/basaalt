import { useEffect, useState } from 'react';
import '../assets/styles/contact.css';
import FormInput from '../components/FormInput';
import Title from '../components/Title';
import Button from '../components/Button';
import axios from 'axios';

function Contact() {

  const [messages, setMessages] = useState([]);
  const [messageDatas, setMessageDatas] = useState();
  const [errors, setErrors] = useState({
    text: '',
    author: {
      firstName: '',
      lastName: '',
      email: ''
    }
  });

  // send message
  function sendMessage(e) {
    e.preventDefault();
    // get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const text = document.getElementById('message').value;

    // check if user is already in database
    const getUser = async () => {
      try {
        const res = axios.get("https://127.0.0.1:8000/api/users?email=" + email)
        return res;
      } catch (e) {
        console.error(e)
      }
    }

    const newMessage = async () => {
      const datas = await getUser();
      const author = datas.data['hydra:member'].length === 1 ? datas.data['hydra:member'][0] : null;

      // build new message
      const newMessage = {
        text: text,
        author: author ? author : {
          firstName: firstName,
          lastName: lastName,
          email: email
        }
      }
      return newMessage;
    }

    const sendMessage = async () => {
      try {
        const message = await newMessage();
        const res = await axios.post(
          "https://127.0.0.1:8000/api/messages",
          message,
          {
            headers:
              { "Content-Type": "application/ld+json" }
          })
        console.log(res)
        if (res.status === 201) {
          setErrors({
            text: '',
            author: {
              firstName: '',
              lastName: '',
              email: ''
            }
          })
          setMessageDatas(message);
        }
      } catch (error) {
        // console.error(error)
        if (error.response.status == 422) {
          const newErrors = { ...errors };

          // get violations 
          const violations = error.response.data.violations;

          // foreach input, check if there is an error message -> if yes, display it
          newErrors.author.firstName = violations.find((violation) => violation.propertyPath === 'author.firstName') ? violations.find((violation) => violation.propertyPath === 'author.firstName').message : '';
          newErrors.author.lastName = violations.find((violation) => violation.propertyPath === 'author.lastName') ? violations.find((violation) => violation.propertyPath === 'author.lastName').message : '';
          newErrors.author.email = violations.find((violation) => violation.propertyPath === 'author.email') ? violations.find((violation) => violation.propertyPath === 'author.email').message : '';
          newErrors.text = violations.find((violation) => violation.propertyPath === 'text') ? violations.find((violation) => violation.propertyPath === 'text').message : '';

          setErrors(newErrors);
        }
      }
    }
    sendMessage();

  }


  // display messages
  useEffect(() => {
    const datas = async () => {
      try {
        const res = await axios.get("https://127.0.0.1:8000/api/messages")
        setMessages(res.data['hydra:member'])
      } catch (e) {
        console.error(e)
      }
    }
    datas()
  }, [messageDatas]);

  return (
    <>
      <section>
        <div className="container">
          <Title text="Formulaire de contact" />
          <form
            action=""
            method="POST"
          >
            <FormInput
              type="text"
              name="firstName"
              label="Prénom"
              placeholder='Entrez votre prénom'
            />
            {errors.author.firstName && <p className="error">{errors.author.firstName}</p>}
            <FormInput
              type="text"
              name="lastName"
              label="Nom"
              placeholder='Entrez votre nom'
            />
            {errors.author.lastName && <p className="error">{errors.author.lastName}</p>}
            <FormInput
              type="email"
              name="email"
              label="E-mail"
              placeholder='Entrez votre e-mail'
            />
            {errors.author.email && <p className="error">{errors.author.email}</p>}
            <FormInput
              type="textarea"
              name="message"
              label="Message"
              placeholder='Écrivez votre message ici'
            />
            {errors.text && <p className="error">{errors.text}</p>}
            <Button
              text="Envoyer"
              className="CTA button"
              onClick={sendMessage}
            />
          </form>
        </div>
      </section>
      <section>
        <div className="container">
          <Title text="Tous les messages" />
          {
            messages.map((message, index) => {
              return (
                <div key={index} className="message">
                  <p>Message de : {message.author.firstName} {message.author.lastName} ({message.author.email.toLowerCase()})</p>
                  <p>{message.text}</p><br />
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  );
}

export default Contact;
