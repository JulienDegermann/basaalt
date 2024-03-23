import { useEffect, useState } from 'react';
import '../assets/styles/contact.css';
import FormInput from '../components/FormInput';
import Title from '../components/Title';
import Button from '../components/Button';
import axios from 'axios';

function Contact() {

  const [messages, setMessages] = useState([]);
  const [messageDatas, setMessageDatas] = useState({});

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
      axios
        .get("https://127.0.0.1:8000/api/users?email=" + email)
        .then(response => {
          const newMessage = {
            text: text,
            author: undefined
          };
          if (response.data['hydra:member'].length === 1) {
            newMessage.author = response.data['hydra:member'][0];
          } else {
            newMessage.author = {
              firstName: firstName,
              lastName: lastName,
              email: email
            };
          }
          console.log('message');
          console.log(newMessage);

          if (newMessage.author !== undefined) {
            axios
              .post(
                "https://127.0.0.1:8000/api/messages",
                newMessage,
                {
                  headers:
                    { "Content-Type": "application/ld+json" }
                })
              .then(() => {
                setMessageDatas(newMessage);
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

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
            <FormInput
              type="text"
              name="lastName"
              label="Nom"
              placeholder='Entrez votre nom'
            />
            <FormInput
              type="email"
              name="email"
              label="E-mail"
              placeholder='Entrez votre e-mail'
            />
            <FormInput
              type="textarea"
              name="message"
              label="Message"
              placeholder='Écrivez votre message ici'
            />
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
