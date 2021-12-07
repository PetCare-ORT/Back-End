import Joi from "joi";

const reminderSchema = Joi.object({
  name: Joi.string().min(2).max(15).required(),
  alarmDate: Joi.date()
    .greater(Date.now() - 24 * 60 * 60 * 1000)
    .required(),
});

function validateReminder(reminder) {
  const result = reminderSchema.validate(reminder);
  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  return result.value;
}

export { validateReminder };
