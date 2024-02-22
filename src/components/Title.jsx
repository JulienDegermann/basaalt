import PropTypes from 'prop-types';

export default function Title({ text, level }) {
  level = parseInt(level);
  switch (level) {
    case 1:
      return (
        <h1 className="section-title">{text}</h1>
      );
    case 2:
      return (
        <h2 className="section-title">{text}</h2>
      );
    case 3:
      return (
        <h3 className="section-title">{text}</h3>
      );
    case 4:
      return (
        <h4 className="section-title">{text}</h4>
      );
    case 5:
      return (
        <h5 className="section-title">{text}</h5>
      );
    case 6:
      return (
        <h6 className="section-title">{text}</h6>
      );
    default:
      return (
        <h2 className="section-title">{text}</h2>
      );
  }
}
Title.propTypes = {
  text: PropTypes.string.isRequired,
  level: PropTypes.string
}