export const convertToDegreesCelsius = (f: number) => {
  return Math.round((f - 32) * (5 / 9));
};
