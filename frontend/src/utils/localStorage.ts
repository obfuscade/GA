export const setItemStorage = ({
  key,
  value,
}: {
  key: string;
  value: string;
}): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const removeItemStorage = (key: string): void => {
  localStorage.removeItem(key);
};
