import PropTypes from 'prop-types';

regex.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['name', 'text', 'email', 'phone']).isRequired,
  fieldName: PropTypes.string.isRequired
}

/**
 * @name regex
 * @description
 * @param {string} value : the value to test (name, text, email, phone)
 * @param {string} type : the type of value to test
 * @param {string} fieldName : the name of the field to display in the error message
 * @returns {boolean} : true if the value is correct
*/
export default function regex({ value, type, fieldName }) {
  if (!value) { return `${fieldName} requis`; }
  switch (type) {
    case 'name':
      return nameValidator(value, fieldName);
    case 'text':
      return textValidator(value, fieldName);
    case 'email':
      return emailValidator(value, fieldName);
    case 'phone':
      return phoneValidator(value, fieldName);
    default:
      return false;
  }
}

/**
 * function to check if a value matches with name template
 * @param {*} value : the value to test
 * @param {string} fieldName : field name output to display
 * @returns {string|boolean} : error message or false if no error
 */
export function nameValidator(value = null, fieldName = '') {
  if (value.length < 2 || value.length > 255) { return `${fieldName} invalide : doit contenir entre 2 et 255 caractères`; }
  const name = new RegExp(/^[a-zA-Z\s\-\p{L}]{2,255}$/);
  if (!name.test(value)) { return `${fieldName} invalide : contient des caractères non autorisés`; }
  return false;
}

/**
 * function to check if a value matches with text template
 * @param {*} value : the value to test
 * @param {string} fieldName : field name output to display
 * @returns {string|boolean} : error message or false if no error
 */
export function textValidator(value = null, fieldName = '') {
  if (value.length < 2) { return `${fieldName} invalide : doit contenir plus de 2 caractères`; }
  const text = new RegExp(/^[a-zA-Z0-9\s()\-\'?:.,!@\/\"\p{L}]{2,}$/);
  if (!text.test(value)) { return `${fieldName} invalide : contient des caractères non autorisés`; }
  return false;
}

/**
 * function to check if a value matches with email template
 * @param {*} value : the value to test
 * @param {string} fieldName : field name output to display
 * @returns {string|boolean} : error message or false if no error
 */
export function emailValidator(value = null) {
  const email = new RegExp(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-]+)*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)$/);
  if (email.test(value)) { return 'Email invalide : contient des caractères non autorisés'; }
  return false;
}

/**
 * function to check if a value matches with phone template
 * @param {*} value : the value to test
 * @param {string} fieldName : field name output to display
 * @returns {string|boolean} : error message or false if no error
 */
export function phoneValidator(value = null, fieldName = '') {
  if (!value) { return `${fieldName} requis`; }
  const phone = new RegExp(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2,})$/);
  if (phone.test(value)) { return 'Numéro de téléphone invalide'; }
  return false;
}