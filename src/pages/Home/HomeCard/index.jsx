// styles
import './styles.css';

// dependencies
import PropTypes from 'prop-types';
import Antoine from '/src/assets/images/antoine.webp';
import Thomas from '/src/assets/images/thomas.webp';
import Alex from '/src/assets/images/alex.webp';
import Jeremie from '/src/assets/images/jeremie.webp';

export default function HomeCard({firstName, role, image}) {
    const imageImport = firstName === 'Antoine' ? Antoine : firstName === 'Thomas' ? Thomas : firstName === 'Alex' ? Alex : Jeremie;

    return (
        <>

            <div className="homeCard">

                <img src={imageImport} alt={`photo de ${firstName}`}/>
                <div className="text">
                    <p>{firstName.toUpperCase()}</p>
                    <p>{role}</p>

                </div>
            </div>

        </>
    );
}

HomeCard.propTypes = {
    firstName: PropTypes.string.isRequired,
    image: PropTypes.string,
    role: PropTypes.string.isRequired,
};