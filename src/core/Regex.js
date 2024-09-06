import PropTypes from 'prop-types';

/**
 * @name regex
 * @description
 * @param {string} value : the value to test (name, text, email, phone)
 * @param {string} type : the type of value to test
 * @returns {boolean} : true if the value is correct
 */
export default function regex({ value, type }) {
  const name = new RegExp(/^[a-zA-Z\s\-\p{L}]{2,255}$/u);
  const text = new RegExp(/^[a-zA-Z0-9\s.,'?!\-\p{L}]{2,}$/u);
  const email = new RegExp(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-]+)*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)$/);
  const phone = new RegExp(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2,})$/);

  switch (type) {
    case 'name':
      return name.test(value);
    case 'text':
      return text.test(value);
    case 'email':
      return email.test(value);
    case 'phone':
      return phone.test(value);
    default:
      return false;
  }
}

regex.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['name', 'text', 'email', 'phone']).isRequired
}