import Joi from "joi";

const calendarEntrySchema = Joi.object({
  name: Joi.string().min(2).max(15).required(),
  description: Joi.string().min(2).max(50).required(),
  date: Joi.date().greater(Date.now()).required(),
  //PET MAYBE??
});

function validateCalendarEntry(calendarEntry) {
  const result = calendarEntrySchema.validate(calendarEntry);
  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  return result.value;
}

export { validateCalendarEntry };
