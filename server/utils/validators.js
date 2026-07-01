// Lightweight, dependency-free input validation helpers for auth endpoints.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const isValidEmail = (value) =>
  isNonEmptyString(value) && EMAIL_REGEX.test(value.trim());

// Returns an array of human-readable error messages (empty = valid).
const validateRegister = ({ name, email, password }) => {
  const errors = [];

  if (!isNonEmptyString(name)) {
    errors.push("Name is required");
  }

  if (!isValidEmail(email)) {
    errors.push("A valid email is required");
  }

  if (!isNonEmptyString(password) || password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  return errors;
};

const validateLogin = ({ email, password }) => {
  const errors = [];

  if (!isValidEmail(email)) {
    errors.push("A valid email is required");
  }

  if (!isNonEmptyString(password)) {
    errors.push("Password is required");
  }

  return errors;
};

module.exports = {
  isValidEmail,
  validateRegister,
  validateLogin,
};
