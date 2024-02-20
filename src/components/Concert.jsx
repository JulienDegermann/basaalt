import PropsTypes from 'prop-types';

export default function Concert({ concert }) {

  function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  }

  return (
    <div className="concert-card flex justify-between align-center">
      <img src={`./images/${concert.image}`} alt="" />
      <div className="info flex justify-between align-center">
        <div className=" flex align-start justify-center col">
          <h2>{concert.event}</h2>
          <p>{concert.location}</p>
        </div>
        <a href="" className="CTA">
          plus d'info
        </a>
      </div>

      <div className="flex align-center justify-center date">
        <p>{formatDate(concert.datetime)}</p>
      </div>
    </div>
  )
}

Concert.propTypes = {
  concert: PropsTypes.shape({
    id: PropsTypes.number.isRequired,
    event: PropsTypes.string.isRequired,
    datetime: PropsTypes.instanceOf(Date).isRequired,
    location: PropsTypes.string.isRequired,
    image: PropsTypes.string.isRequired
  }).isRequired
}
