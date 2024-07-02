import PropTypes from "prop-types"

export default function Button({ url, className, text, onClick }) {

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
  onClick: PropTypes.func
}