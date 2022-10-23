export default (number: number, word: string) => {
  return `${number} ${number === 1 ? word : `${word}s`}`;
};
