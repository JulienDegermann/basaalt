// dependencies
import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ModalContext } from './useModal';

export const SendMessageContext = createContext({});

export function SendMessageContextProvider({ children }) {

  const { modals, setModals } = useContext(ModalContext)

  console.log(modals)

  // define object pattern
  const [message, setMessage] = useState({
    text: '',
    author: {
      firstName: '',
      lastName: '',
      email: ''
    }
  })

  const [errors, setErrors] = useState({
    text: '',
    author: {
      firstName: '',
      lastName: '',
      email: ''
    }
  })

  const findUserByEmail = async (author) => {
    try {
      const user = await axios.get("https://127.0.0.1:8000/api/users?email=" + author.email)

      // if user doesn't exist, create it
      return user.data['hydra:member'].length === 1 ? user.data['hydra:member'][0] : author
    } catch (error) {
      console.error(error)
    }
  }

  const sendMessage = async (message) => {
    try {

      console.log(message)
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
        setModals([...modals, { type: 'success', title: 'Message envoyé', status: true, children: 'Votre message a bien été envoyé' } ])
      }
    } catch (error) {
      const violations = error.response.data.violations;

      const newErrors = { ...errors };

      // foreach input, check if there is an error message -> if yes, display it
      newErrors.author.firstName = violations.find((violation) => violation.propertyPath === 'author.firstName') ? violations.find((violation) => violation.propertyPath === 'author.firstName').message : '';
      newErrors.author.lastName = violations.find((violation) => violation.propertyPath === 'author.lastName') ? violations.find((violation) => violation.propertyPath === 'author.lastName').message : '';
      newErrors.author.email = violations.find((violation) => violation.propertyPath === 'author.email') ? violations.find((violation) => violation.propertyPath === 'author.email').message : '';
      newErrors.text = violations.find((violation) => violation.propertyPath === 'text') ? violations.find((violation) => violation.propertyPath === 'text').message : '';

      setErrors(newErrors);
    }
  }

  const sendMessageResponse = async () => {

    // find user by email if exists
    const author = await findUserByEmail(message.author);

    // create messsage object
    const sendingMessage = {
      text: message.text,
      author: author
    }

    // send message
    sendMessage(sendingMessage);
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessageResponse(message)
  }

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
  )
}

SendMessageContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}