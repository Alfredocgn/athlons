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
export const isValidDate = (dateString: string): boolean => {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};
