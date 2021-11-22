import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(5).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

function validateUser(user) {
  const result = userSchema.validate(user);
  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  return result.value;
}

export { validateUser };
