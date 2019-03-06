import { getDate } from './dateMethod';

export const getDatePriceKey = (date) => {
  if (date) {
    const M = getDate(date, 'M');
    const day = getDate(date, 'dayIndex');
    const frontKey = (M >= 4 && M <= 10) ? 'peakSeason' : 'lowSeason';
    const backKey = (day >= 1 && day <= 5) ? 'Weekday' : 'Weekend';
    return `${frontKey}${backKey}`;
  }
  return false;
};

export const formatNumberDate = (numberDate) => {
  const stringDate = numberDate.toString();
  const year = stringDate.slice(0, 4);
  const month = stringDate.slice(4, 6);
  const date = stringDate.slice(6, 8);

  return `${year}/${month}/${date}`;
};
