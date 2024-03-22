import PropTypes from 'prop-types';

export default function Social({ networks }) {
  const card = networks.map((data, index) => {
    return (
      <div key={index} className="social">
        <a href={data.url} title={data.name}>
          <img src={`./images/${data.image}`} alt={data.name} />
        </a>

      </div>
    )
  })

  return (
    <>
      <div className="flex justify-between align-center">
        {card}

      </div>
    </>
  )
}

Social.propTypes = {
  index: PropTypes.number,
  networks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  )
}