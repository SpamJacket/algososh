const reverseString = (sourceArray: string[]): string[][] => {
  const arrayStates: string[][] = [sourceArray];
  for (let i = 0; i < Math.floor(sourceArray.length / 2); i++) {
    const res = [...arrayStates[i]];
    const tmp = res[i];
    res[i] = res[res.length - 1 - i];
    res[res.length - 1 - i] = tmp;
    arrayStates[i + 1] = res;
  }
  return arrayStates;
};

export default reverseString;
