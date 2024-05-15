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
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const text = document.getElementById('message').value;


    if (firstName === '' || lastName === '' || email === '' || text === '') {
      alert('Message non envoyé');
      return;
    } else {
      // check if user is already in database
      axios
        .get("https://127.0.0.1:8000/api/users?email=" + email)
        .then(response => {
          const newMessage = {
            text: text,
            author: undefined
          };
          if (response.data['hydra:member'].length === 1) { // if found, use existing user and inject it in new.map
            newMessage.author = response.data['hydra:member'][0];
          } else { //create new user and inject it in newMessage
            newMessage.author = {
              firstName: firstName,
              lastName: lastName,
              email: email
            };
          }
          
          if (newMessage.author !== undefined) { // check if user is defined and injected in newMessage
            // send message build with author(firstName, lastName, email) + text

            // make a try catch to handle errors
            axios
              .post(
                "https://127.0.0.1:8000/api/messages",
                newMessage,
                {
                  headers:
                    { "Content-Type": "application/ld+json" }
                })
              .then((res) => {
                // reset errors and messageDatas
                setErrors({})
                setMessageDatas(newMessage);
              })
              .catch(error => {
                if (error.response.status == 422) {
                  const newErrors = { ...errors };
                  error.response.data.violations.forEach((violation) => {
                    switch (violation.propertyPath) {
                      case 'author.firstName':
                        newErrors.author.firstName = violation.message;
                        break;
                      case 'author.lastName':
                        newErrors.author.lastName = violation.message;
                        break;
                      case 'author.email':
                        newErrors.author.email = violation.message;
                        break;
                      case 'text':
                        newErrors.text = violation.message;
                        break;

                    }
                    setErrors(newErrors);
                  })
                }
              });
          }
        });
    }
  }
  
  // display messages
  useEffect(() => {
    axios
      .get("https://127.0.0.1:8000/api/messages")
      .then(response => {
        setMessages(response.data['hydra:member']);
      })
      .catch(error => {
        console.log(error);
      });

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
