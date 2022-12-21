export const validatePassword = (
  password: string,
  confirmPassword: string,
): void => {
  const minimumLength = 6;
  // isEmpty
  if (!password || !confirmPassword || password.length < minimumLength) {
    throw new Error(
      `Preencha os campos Senha e Confirmacao de Senha corretamente`,
    );
  }

  // Diff password
  if (password !== confirmPassword) {
    throw new Error(`As senhas sao diferentes! Preencha o campo corretamente`);
  }
};
