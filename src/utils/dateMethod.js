export const getDate = (timeType, type = 'fullDate') => {
  const dayList = ['日', '一', '二', '三', '四', '五', '六'];
  let timestamp = Date.now();
  if (typeof timeType === 'string' || typeof timeType === 'number') {
    const numberTime = new Date(timeType).setHours(0, 0, 0, 0);
    if (Number.isNaN(numberTime)) return '--';
    timestamp = numberTime;
  }

  const d = new Date(timestamp);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const date = d.getDate().toString().padStart(2, '0');
  const day = dayList[d.getDay()];
  if (type === 'fullDate') return `${year}-${month}-${date}`;
  if (type === 'fullDateFormat') return `${year}/${month}/${date}`;
  if (type === 'date') return `${month}/${date}`;
  if (type === 'day') return `${day}`;
  if (type === 'dayIndex') return d.getDay();
  if (type === 'timestamp') return timestamp;
  return '--';
};

export const addDays = (timeType, days, overLimit = false) => {
  let timestamp = null;
  if (typeof timeType === 'string' || typeof timeType === 'number') {
    const numberTime = new Date(timeType).setHours(0, 0, 0, 0);
    if (Number.isNaN(numberTime)) return '--';
    timestamp = numberTime;
  }
  const newDate = timestamp + days * 24 * 60 * 60 * 1000;
  if (overLimit && typeof overLimit === 'number') {
    const limitTimestamp = new Date().setHours(0, 0, 0, 0) + overLimit * 24 * 60 * 60 * 1000;
    let smallNewDate = newDate;
    while (smallNewDate > limitTimestamp) {
      smallNewDate = subtractDays(smallNewDate, 1);
    }
    return smallNewDate;
  }
  return newDate;
};

export const subtractDays = (timeType, days, past = true) => {
  let timestamp = null;
  if (typeof timeType === 'string' || typeof timeType === 'number') {
    const numberTime = new Date(timeType).setHours(0, 0, 0, 0);
    if (Number.isNaN(numberTime)) return '--';
    timestamp = numberTime;
  }
  const newDate = timestamp - days * 24 * 60 * 60 * 1000;
  if (!past) {
    const todatTimestamp = new Date().setHours(0, 0, 0, 0);
    let bigNewDate = newDate;
    while (bigNewDate < todatTimestamp) {
      bigNewDate = addDays(bigNewDate, 1);
    }
    return bigNewDate;
  }
  return newDate;
};

export const getDayRange = (dateOne, dateTwo) => {
  const dateOneTime = new Date(dateOne).setHours(0, 0, 0, 0);
  const dateTwoTime = new Date(dateTwo).setHours(0, 0, 0, 0);
  const days = Math.abs((dateOneTime - dateTwoTime) / (24 * 60 * 60 * 1000));
  return days - 1;
};
