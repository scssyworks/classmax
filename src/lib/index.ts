export const cm = (
  ...args: (
    | string
    | null
    | undefined
    | Record<string, boolean | null | undefined>
  )[]
): string => {
  return args
    .reduce<string>((classString, curr) => {
      if (!curr) {
        return classString;
      }
      if (typeof curr === 'string') {
        return `${classString} ${curr}`;
      }
      return `${classString} ${cm(...Object.keys(curr).filter((key) => curr[key]))}`;
    }, '')
    .trim();
};
