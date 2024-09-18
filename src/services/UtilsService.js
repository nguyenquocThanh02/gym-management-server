const checkValidTime = (validFrom, validTo) => {
  const timeFrom = new Intl.DateTimeFormat("en-GB").format(validFrom);
  const timeTo = new Intl.DateTimeFormat("en-GB").format(validTo);
  const now = new Date();
  const timeNow = new Intl.DateTimeFormat("en-GB").format(now);
  console.log(timeFrom, timeTo, timeNow);
  return timeNow >= timeFrom && timeNow <= timeTo;
};

module.exports = { checkValidTime };
