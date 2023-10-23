const checkLength = (strValue, maxLength) => strValue.length <= maxLength;

const isPalindrome = (string) => {
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
    if (!isNaN(string.at(i))) {
      result = result.concat(string.at(i));
    }
  }
  if (result.length === 0) {
    return NaN;
  }

  return +result;
};

const convertTimeToMinutes = (time) => {
  const minutes = time.split(':');
  return +minutes[0] * 60 + +minutes[1];
};

const isAMeetingPossible = (start, end, meet, meetTime) => {
  const startsAt = convertTimeToMinutes(start);
  const endsAt = convertTimeToMinutes(end);
  const meetStartsAt = convertTimeToMinutes(meet);
  if (meetStartsAt >= startsAt && meetStartsAt + meetTime <= endsAt) {
    return true;
  }

  return false;
};

getNumbersFromString('146.15dwawf789awd');
isPalindrome('awa');
checkLength('16156', 4);
isAMeetingPossible('8:00', '17:30', '08:00', 900);
