// styles
import './styles.css';

// dependecies
import PropTypes from 'prop-types';

export default function Button({
                                   url,
                                   className,
                                   text,
                                   onClick,
                                   id,
                                   ariaLabel,
                                   children
                               }) {

    if (url !== undefined) {
        return (
            <a
                href={url}
                className={className}
                aria-label={ariaLabel ? ariaLabel : text}
                target={'_blank'}
            >
                {text}
            </a>);
    } else {
        return (
            <button
                id={id}
                onClick={onClick}
                className={className}
                aria-label={ariaLabel ? ariaLabel : text}
            >
                {children ? children : text}
            </button>
        );
    }
}

Button.propTypes = {
    url: PropTypes.string,
    className: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onClick: PropTypes.func,
    id: PropTypes.string,
    ariaLabel: PropTypes.string,
    children: PropTypes.node
};