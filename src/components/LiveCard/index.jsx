// styles
import './styles.css';

// dependecies
import PropTypes from 'prop-types';

// components
import Link from '../Link'

export default function LiveCard({ concert, onClick }) {

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };

    const formattedDate = new Date(dateString).toLocaleDateString('fr-FR', options);
    return formattedDate;
  };

  const cityName = concert.city ? concert.city.name : "";
  const cityCode = concert.city ? concert.city.zipCode : "";

  return (
    <div
      className="concert-card justify-between align-center"
    // onClick= {onClick ? () => onClick(concert.address) : null}
    >
      {/* <img src={`./images/${concert.image}`} alt="" /> */}
      {/* <img src="./images/basaalt.png" alt="" /> */}
      <div className="info justify-between align-center">
        <div className=" flex align-start justify-center col">
          <h2>{concert.eventName}</h2>
          <p>{concert.address} {cityCode} {cityName.toUpperCase()}</p>
          <p>{formatDate(concert.eventDate)}</p>
        </div>
        <Link
          text="plus d'infos"
          url="https://google.com"
          target={true}
          className="CTA"
        />
      </div>
    </div>
  )
}

LiveCard.propTypes = {
  concert: PropTypes.shape({
    id: PropTypes.number.isRequired,
    eventName: PropTypes.string,
    eventDate: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired
    }),
    image: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func
}
