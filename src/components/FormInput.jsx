import PropTypes from 'prop-types';

export default function FormInput({
  type,
  name,
  label,
  defaultValue,
  onChange,
  placeholder,
  error,
  value,
  children }) {

  if (type == 'textarea') {
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <textarea
          name={name}
          id={name}
          required
          placeholder={placeholder}
          className={error ? 'error' : ''}
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
          className={error ? 'error' : ''}
        >
          {children}
        </select>
      </>
    )
  } else if (type == 'radio') {
    const border = label === value ? '4px solid blue' : '1px solid';
    return (
      
      <>
        <input
          name={name}
          id={label}
          value={label}
          type='radio'
          required
          onChange={onChange}
          defaultValue={defaultValue}
          className={error ? 'error' : ''}
          style={{ background: label, width: '30px', heigth: '30px', display: 'none' }}
        />

        <label htmlFor={label}>
          <div
            style={{
              background: label,
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              outline: border,              
            }}>
          </div>
        </label>
      </>)
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
          defaultValue={defaultValue}
          onChange={onChange}
          required
          placeholder={placeholder}
          className={error ? 'error' : ''}
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
  defaultvalue: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node,
  defaultValue: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}