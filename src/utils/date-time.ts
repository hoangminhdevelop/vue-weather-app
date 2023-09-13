export const dateFormat = (time: number) => {
  return new Date(time).toLocaleDateString("en-us", {
    weekday: "short",
    day: "2-digit",
    month: "long",
  });
};

export const timeFormat = (
  time: number,
  options?: Intl.DateTimeFormatOptions
) => {
  return new Date(time).toLocaleTimeString("en-us", options);
};

export const dayFormat = (time: number) => {
  return new Date(time).toLocaleDateString("en-us", {
    weekday: "long",
  });
};
