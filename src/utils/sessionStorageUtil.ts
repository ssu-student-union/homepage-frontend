export const setSessionStorage = (key: string, value: string) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key: string) => {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
