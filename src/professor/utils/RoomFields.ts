export const PasswordFields = {
  OldPassword: "usuOldPassword",
  NewPassword: "usuPassword",
  ConfirmPassword: "confirmPassword",
} as const;

export type PasswordFields = typeof PasswordFields[keyof typeof PasswordFields];