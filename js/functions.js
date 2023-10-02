const checkLength = (strValue, maxLength) => strValue.length <= maxLength;
const IsPalindrome = (string) =>
{
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let emptyString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    emptyString += normalizedString.at(i);
  }
  return emptyString === normalizedString;
};
const getNumbersFromString = (string) => {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(string.at(i)))  {
      result = result.concat(string.at(i));
    }
  }
  if (result.length === 0) {
    return NaN;
  }
  return +result;
};

console.log(getNumbersFromString('146.15dwawf789awd'));
IsPalindrome('awa');
checkLength('16156', 4);
