export default (timestamp: number, withHours: boolean = false) => {
  const date = new Date(Number(timestamp));
  let hours: string | number = String(date.getHours());
  let minutes = String(date.getMinutes());
  let day = String(date.getDate());
  let month = String(date.getMonth() + 1);
  let year = date.getFullYear();
  const ampm = +hours >= 12 ? 'PM' : 'AM';

  hours = +hours % 12;
  hours = hours || 12;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = +minutes < 10 ? `0${minutes}` : minutes;

  day = day.length === 1 ? `0${day}` : day;
  month = month.length === 1 ? `0${month}` : month;

  return withHours
    ? `${hours}:${minutes} ${ampm} ${day}/${month}/${year}`
    : `${day}/${month}/${year}`;
};
