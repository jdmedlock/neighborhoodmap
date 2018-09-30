/**
 * @description Remove all special characters from a string
 * @param {String} string String from which the special characters are to be removed
 * @returns {String} Original string with special characters removed
 */
const removeSpecialChars = (string) => {
  const specialCharacters = '_';
  const specialCharArray = specialCharacters.split('');
  return string.split('').map( (char) => {
    if (specialCharArray.indexOf(char) > -1) {
      return ' ';
    }
    return char;
  }).join('');
}

export { removeSpecialChars };