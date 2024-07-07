// styles
import './styles.css'

// dependecies
import PropTypes from "prop-types"

export default function Section({ id, heroBanner, title, children }) {
  return (
    <section
      id={id}
      className={heroBanner ? 'heroBanner' : ''}
    >
      <div className="container">
        {title && <h2 className="sectionTitle">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  heroBanner: PropTypes.bool
}