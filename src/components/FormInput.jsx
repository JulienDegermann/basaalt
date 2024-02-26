import PropTypes from 'prop-types';

export default function FormInput({ 
  type, 
  name, 
  label, 
  defaultValue, 
  onChange, 
  placeholder, 
  error, 
  children }) {

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
  } else if (type == 'select') {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          id={name}
          required
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={defaultValue}
        >
          {children}
        </select>
      </>
    )
  }
  
  else {

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
          defaultValue={defaultValue}
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
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node
}