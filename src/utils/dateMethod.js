export default function getDate(timeType, type = 'date') {
  const dayList = ['日', '一', '二', '三', '四', '五', '六'];
  let timestamp = Date.now();
  if (typeof timeType === 'string' || typeof timeType === 'number') {
    const numberTime = new Date(timeType).valueOf();
    if (isNaN(numberTime)) return '--';
    timestamp = numberTime;
  }

  const d = new Date(timestamp);
  const year = d.getFullYear();
  const m = d.getMonth() + 1;
  const month = m < 10 ? `0${m}` : m;
  const date = d.getDate();
  const day = dayList[d.getDay()];
  if (type === 'date') return `${year}-${month}-${date}`;
  if (type === 'dateFormat') return `${year}/${month}/${date}`;
  return '--';
}
