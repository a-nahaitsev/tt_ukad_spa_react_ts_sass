export const debounce = (f: (value: string) => void, delay: number) => {
  let timerId: NodeJS.Timeout;

  return (value: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, value);
  };
};
