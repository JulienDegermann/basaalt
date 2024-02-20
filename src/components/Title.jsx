import PropTypes from 'prop-types';

export default function Title({ text }) {
  return (
    <h3 className="section-title">{text}</h3>
  )
}

Title.propTypes = {
  text: PropTypes.string.isRequired
}