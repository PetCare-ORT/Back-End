import Joi from "joi";

const diaryEntrySchema = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  date: Joi.date().required(),
  attatchment: Joi.optional(),
});

function validateDiaryEntry(diaryEntry) {
  const result = diaryEntrySchema.validate(diaryEntry);
  if (result.error) {
    throw new Error(result.error.details[0].message);
  }
  return result.value;
}

export { validateDiaryEntry };
