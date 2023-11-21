const generateFibonacci = (n: number): number => {
  if (n === 1 || n === 0) {
    return 1;
  }

  return generateFibonacci(n - 1) + generateFibonacci(n - 2);
};

const getFibonacciArray = (sourceNumber: number): number[] => {
  const array: number[] = [];

  for (let i = 0; i < sourceNumber + 1; i++) {
    array.push(generateFibonacci(i));
  }

  return array;
};

export default getFibonacciArray;
