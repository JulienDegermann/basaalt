import PropsTypes from 'prop-types';

export default function Concert({ concert }) {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-EN',  options);
    return formattedDate;
  };

  const cityName = concert.city ? concert.city.name : "";
  const cityCode = concert.city ? concert.city.zipCode : "";
  return (
    <div className="concert-card justify-between align-center">
      {/* <img src={`./images/${concert.image}`} alt="" /> */}
      <img src="./images/basaalt.png" alt="" />
      <div className="info justify-between align-center">
        <div className=" flex align-start justify-center col">
          <h2>{concert.eventName}</h2>
          <p>{concert.address}</p>
          <p>{cityCode} {cityName.toUpperCase()}
          </p>

        </div>
        <a href="https://google.com" target="_blank" className="CTA">
          plus d&apos;infos
        </a>
      </div>

      <div className="flex align-center justify-center date">
        <p>{formatDate(concert.eventDate)}</p>
      </div>
    </div>
  )
}

Concert.propTypes = {
  concert: PropsTypes.shape({
    id: PropsTypes.number.isRequired,
    eventName: PropsTypes.string,
    eventDate: PropsTypes.string,
    address: PropsTypes.string,
    city: PropsTypes.shape({
      name: PropsTypes.string.isRequired,
      zipCode: PropsTypes.string.isRequired
    }),
    image: PropsTypes.string
  }).isRequired
}
