import PropTypes from 'prop-types';

export default function HomeCard({ firstName, role, image }) {
  return (
    <>

      <div className="home-card">
        <img src={`./images/${image}`} alt={firstName} />
        <p>{firstName}</p>
        <p>{role}</p>
      </div>

    </>
  )
}

HomeCard.propTypes = {
  firstName: PropTypes.string.isRequired,

  image: PropTypes.string,
  role: PropTypes.string.isRequired,
}

