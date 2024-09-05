// dependencies
import PropTypes from 'prop-types';

/**
 * FormInput component
 * @param {string} type - input type (text, email, password, number, textarea, select, radio)
 * @param {string} name - input name
 * @param {string} label - input label
 * @param {string} defaultValue - input default value
 * @param {function} onChange - input onChange event
 * @param {string} placeholder - input placeholder
 * @param {string} error - input error message
 * @param {string} value - input value
 * @param {node} children - input children (eg : options for select)
 * @returns {JSX.Element}
 */
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
      <div className='formInput'>
        <label htmlFor={name}>{label}</label>
        <textarea
          name={name}
          id={name}
          required
          placeholder={placeholder}
          onChange={onChange}
          className={error ? 'error' : ''}
        />
      </div>


    )
  } else if (type == 'select') {
    return (
      <div className='formInput'>
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
      </div>
    )
  } else if (type == 'radio') {
    const border = label === value ? '4px solid blue' : '1px solid';
    return (
      
      <div className='formInput'>
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
      </div>)
  } else {
    return (
      <div className='formInput'>
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
      </div>
    );
  }
}

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}