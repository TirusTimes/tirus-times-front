export const validateAge = (input: number, key: string): void => {
  const minimumLength = 5;
  // Minimum age
  if (input < minimumLength) {
    throw new Error(`Preencha o campo "${key}" corretamente`);
  }
};
