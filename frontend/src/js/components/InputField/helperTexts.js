export const helperTexts = {
  isRequired: `This field is required!`,
  invalidPasswordFormat:
    "Minimum 8 characters. Password must be contains lowercase, one capital letter and one digit!",
  invalidFormat: (prompt = "") =>
    `Invalid data format!${prompt ? ` ${prompt}` : ""}`,
  valueOutOfTheRange: (name = "value", min, max) =>
    `The ${name} is out of the range (${min} - ${max})`,
  valueLess: (name = "value", min) => `The ${name} must be greater than ${min}`,
  valueMore: (name = "value", max) => `The ${name} must be less than ${max}`,
};
