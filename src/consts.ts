export const validations = [
  {
    test: (val: string) => val.length < 6,
    message: "Password must be at least 6 characters",
  },
  {
    test: (val: string) => val.length > 20,
    message: "Password must be less than 20 characters",
  },
  {
    test: (val: string) => !/[A-Z]/.test(val),
    message: "Password must contain an uppercase letter",
  },
  {
    test: (val: string) => !/[!@#$%^&*]/.test(val),
    message: "Password must contain a special character",
  },
  {
    test: (val: string) => !/\d/.test(val),
    message: "Password must contain a number",
  },
];

export const confirmPasswordValidations = [
  {
    test: (confirmPass: string, pass?: string) => confirmPass !== pass,
    message: "Passwords don't match!",
  },
];
