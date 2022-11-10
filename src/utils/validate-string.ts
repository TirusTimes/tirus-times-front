export const validateString = (input: string, key: string): void => {
  const data = input.trim();
  const minimumLength = 2;
  const emailRegex =
    // eslint-disable-next-line
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // isEmpty
  if (data === undefined || data.length < minimumLength) {
    throw new Error(`Preencha o campo "${key}" corretamente`);
  }

  // isValidEmail
  if (key.toLowerCase() === 'email') {
    if (!data.match(emailRegex)) {
      throw new Error(`Insira um email válido`);
    }
  }
};
