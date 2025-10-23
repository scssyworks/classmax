export const handleSuffix = (key: string, value: string) => {
  if (value.startsWith('post:')) {
    return `${key}${value.substring(5)}`;
  } else if (value.startsWith('pre:')) {
    return `${value.substring(4)}${key}`;
  } else {
    return `${value}:${key}`;
  }
};
