import PropTypes from 'prop-types';

export default function HomeCard({ datas }) {
  return (
    <>
      {datas.map((data, index) => {
          return (
            <div key={index} className="home-card">
              <img src={`./images/${data.image}`} alt={data.firstName} />
              <p>{data.firstName}</p>
              <p>{data.role}</p>
            </div>
          )
        })
      }
    </>
  )
}

HomeCard.propTypes = {
  index: PropTypes.number,
  datas: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }).isRequired
  )
}