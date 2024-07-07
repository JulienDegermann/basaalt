// styles
import './Button/styles.css';

// dependecies
import PropTypes from 'prop-types';

export default function Link({ text, url, target, className }) {
  return (
    <a href={url} className={className} target={target ? '_blank' : '_self'} className="CTA">
      {text}
    </a>
  )
}

Link.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  target: PropTypes.bool,
  className: PropTypes.string
}