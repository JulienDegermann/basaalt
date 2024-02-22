import PropTypes from 'prop-types';

export default function FormInput({ type, name, label, value, onChange, placeholder, error }) {

  if (type == 'textarea') {
    console.log('textarea');
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <textarea
          name={name}
          id={name}
          required
          placeholder={placeholder}
        />
      </>


    )
  } else {

    return (

      <>
        <label
          htmlFor={name}
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
        />
        {error && <p>{error}</p>}
      </>
    );
  }
}

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string
}