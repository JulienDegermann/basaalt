import '../assets/styles/contact.css';
import FormInput from '../components/FormInput';
import Title from '../components/Title';

function Contact() {
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

            <FormInput
              type="submit"
              name="Envoyer"
              label=""
            />
          </form>
        </div>

      </section>
    </>
  )
}

export default Contact;
