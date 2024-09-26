const checkValidTime = (validFrom, validTo) => {
  const timeFrom = new Intl.DateTimeFormat("en-GB").format(validFrom);
  const timeTo = new Intl.DateTimeFormat("en-GB").format(validTo);
  const now = new Date();
  const timeNow = new Intl.DateTimeFormat("en-GB").format(now);
  return timeNow >= timeFrom && timeNow <= timeTo;
};

const checkTimeCancel = (dateStart) => {
  const theDateStart = new Intl.DateTimeFormat("en-GB").format(dateStart);
  const now = new Date();
  const timeNow = new Intl.DateTimeFormat("en-GB").format(now);
  return timeNow >= theDateStart;
};

module.exports = { checkValidTime };
