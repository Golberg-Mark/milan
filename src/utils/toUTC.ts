export default (timestamp: number, m: number = 0) => {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours() + m;
  const minutes = date.getUTCMinutes();

  return `${minutes}, ${hour}, ${day}, ${month}, ?, ${year}`;
};
