const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^_\-])[A-Za-z\d@$!%*?&.#^_\-]{8,}$/;

export const isValidEmail = (email: string) => {
  const trimedEmail = email.trim();
  return emailRegex.test(trimedEmail);
};

export const isValidPassword = (password: string) => {
  return passwordRegex.test(password.trim());
};
