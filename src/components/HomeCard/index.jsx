// styles
import './styles.css'

// dependecies
import PropTypes from "prop-types"

export default function HomeCard({ firstName, role, image }) {
  return (
    <>

      <div className="homeCard">
        <img src={`./images/${image.toLowerCase()}`} alt={firstName} />
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

