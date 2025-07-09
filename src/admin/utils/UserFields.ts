export const PasswordFields = {
  Password: "usuPassword",
  ConfirmPassword: "confirmPassword",
} as const;

export type PasswordFields = typeof PasswordFields[keyof typeof PasswordFields];