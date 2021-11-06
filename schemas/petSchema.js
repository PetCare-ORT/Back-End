import Joi from "joi";
import constants from "../lib/constants.js";

const petSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(50).required(),
  species: Joi.string()
    .valid(...constants.SPECIES)
    .required(),
  race: Joi.string().alphanum().min(2).max(50).required(),
  birthDate: Joi.date().greater(constants.MIN_BIRTHDATE).required(),
  gender: Joi.string()
    .valid(...constants.GENRES)
    .required(),
});

function validatePet(pet) {
  const result = petSchema.validate(pet);
  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  return result.value;
}

export { validatePet };
