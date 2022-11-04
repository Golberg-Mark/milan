export default (name: string) => {
  const splitName = name.split(' ');

  if (splitName.length > 1) return `${splitName[0][0]}${splitName[splitName.length][0]}`.toUpperCase();
  return name.substring(0, 2).toUpperCase();
};
