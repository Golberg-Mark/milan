export default (timestamp: number) => {
  const date = new Date(Number(timestamp));
  let day = String(date.getDate());
  let month = String(date.getMonth());
  let year = date.getFullYear();

  day = day.length === 1 ? `0${day}` : day;
  month = month.length === 1 ? `0${month}` : month;

  return `${day}/${month}/${year}`;
};
