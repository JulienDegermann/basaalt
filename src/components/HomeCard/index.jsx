// styles
import './styles.css'

// dependencies
import { useEffect, useState } from "react";
import PropTypes from "prop-types"
import Antoine from '../../assets/images/antoine.jpg';
 import Thomas from '../../assets/images/thomas.jpg';
 import Alex from '../../assets/images/alex.jpg';
 import Jeremie from '../../assets/images/jérémie.jpg'; 

export default function HomeCard({ firstName, role, image }) {
  const imageImport = firstName === 'Antoine' ? Antoine : firstName === 'Thomas' ? Thomas : firstName === 'Alex' ? Alex : Jeremie;
  
  // const [imageImport, setImageImport] = useState('');

  // useEffect(() => {

  //   const fetchAll = async () => {
  //     const imagesTest = await import.meta.glob('../../assets/images/*.jpg');
  //     const test = Object.keys(imagesTest).find(name => {
  //       console.log('name');
  //       return name.includes(image.toLowerCase())
  //     })
  //     console.log(test);

  //     setImageImport(test);
  //   }

  //   fetchAll();
  // }, [image]);

  // console.log(imageImport);

  return (
    <>

      <div className="homeCard">

        <img src={imageImport} alt={firstName} />
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