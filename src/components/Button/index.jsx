// styles
import './styles.css'

// dependecies
import PropTypes from "prop-types"

export default function Button({ url, className, text, onClick, id }) {

  if (url !== undefined) {
    return (
      <a
        href={url}
        className={className}
      >
        {text}
      </a>)
  } else {
    return (
      <button
      id={id}
        onClick={onClick}
        className={className}
      >
        {text}
      </button>
    )
  }
}

Button.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
  id: PropTypes.string
}