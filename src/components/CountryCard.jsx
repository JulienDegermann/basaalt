import PropTypes from 'prop-types';


function CountryCard({ country }) {
  return (
    <div className="country-card">
      <img src={country.flags.svg} alt={country.name.common} />
      <div className="text flex justify-center align-center col">

      <h2>{country.name.common}</h2>
      <h2>Population : {country.population} habitants</h2>

      </div>
    </div>
  )
}

CountryCard.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    flags: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    capital: PropTypes.string.isRequired,
  }).isRequired
}

export default CountryCard;