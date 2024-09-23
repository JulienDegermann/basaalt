// styles
import './styles.css'

// dependencies
import { useEffect, useState } from "react";
import PropTypes from "prop-types"
import Antoine from '/src/assets/images/antoine.jpg';
import Thomas from '/src/assets/images/thomas.jpg';
import Alex from '/src/assets/images/alex.jpg';
import Jeremie from '/src/assets/images/jérémie.jpg';

export default function HomeCard({ firstName, role, image }) {
  const imageImport = firstName === 'Antoine' ? Antoine : firstName === 'Thomas' ? Thomas : firstName === 'Alex' ? Alex : Jeremie;

  return (
    <>

      <div className="homeCard">

        <img src={imageImport} alt={`photo de ${firstName}`} />
        <div className="text">
          <p>{firstName.toUpperCase()}</p>
          <p>{role}</p>

        </div>
      </div>

    </>
  )
}

HomeCard.propTypes = {
  firstName: PropTypes.string.isRequired,

  image: PropTypes.string,
  role: PropTypes.string.isRequired,
}