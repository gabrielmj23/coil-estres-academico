/**
 * Validate email
 * @param email
 * @author Karim
 */
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password format
 * @param password
 * @author Karim
 */
export const isValidPassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*.,])[A-Za-z\d!@#$%^&*.,]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Get icon for sex dropdown
 * @param sexo
 * @author Roberth
 */
export const getSexoIconSrc = (sexo: string) => {
  switch (sexo) {
    case "":
      return "/check-icon.svg";
    case "M":
      return "/male-icon.svg";
    case "F":
      return "/female-icon.svg";
    case "Otro":
      return "/other-icon.svg";
    default:
      return "";
  }
};
