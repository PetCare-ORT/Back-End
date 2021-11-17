import Joi from "joi";

const reminderSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(15).required(),
  alarmDate: Joi.date().greater(Date.now()).required(),
});

function validateReminder(reminder) {
  const result = reminderSchema.validate(reminder);
  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  return result.value;
}

export { validateReminder };
