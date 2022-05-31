const GetTokens = (strVal: string): string[] => {
  return strVal.toLowerCase().split(' ');
};

export const GetStringTokens = (values: string[]): string[] => {
  return values.reduce<string[]>(
    (acc, curr) => acc.concat(GetTokens(curr)),
    []
  );
};
