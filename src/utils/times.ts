interface CurrentTime {
  hours: string,
  minutes: string,
  timesOfDay: 0 | 1
}

const hoursList = Array.from({ length: 12 }, (_, i) => i + 1 < 10 ? `0${i + 1}` : String(i + 1));
const minutesList = [...Array(60).keys()].map(el => el < 10 ? `0${el}` : String(el));
const tod = ['AM', 'PM'];

const getCurrentTime = (): CurrentTime => {
  const time = new Date().toLocaleString().split(', ')[1];
  const hours = +time.split(':')[0] ? time.split(':')[0] : "12";

  return {
    hours: +hours < 10 ? `0${time.split(':')[0]}` : hours,
    minutes: time.split(':')[1],
    timesOfDay: time.split(' ')[1] === 'AM' ? 0 : 1
  };
};

export { hoursList, minutesList, tod, getCurrentTime };
