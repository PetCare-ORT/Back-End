import * as reminderData from "../data/reminder.js";
import validator from "validator";
import express from "express";
import { validateReminder } from "../schemas/reminderSchema.js";
import errors from "../lib/errors.js";
import messages from "../lib/messages.js";

const remindersRouter = express.Router();

remindersRouter.use("/:id", (req, res, next) => {
  if (!validator.isMongoId(req.params.id)) {
    res.status(400).send(errors.INVALID_ID);
  } else {
    next();
  }
});

remindersRouter.get("/", async (req, res) => {
  const entries = await reminderData.getReminders();
  res.json(entries);
});

remindersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const entry = await reminderData.getReminder(id);
  if (entry == null) {
    res.status(404).send(errors.REMINDER_ENTRY_NOT_FOUND);
  } else {
    res.json(entry);
  }
});

remindersRouter.post("/", async (req, res) => {
  try {
    const newReminder = validateReminder(req.body);
    const result = await reminderData.addReminder(newReminder);
    if (result.acknowledged) {
      res.send(messages.SUCCESSFULL_ADD(newReminder.name));
    } else {
      res.status(500).send(errors.REQUEST_ERROR);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

remindersRouter.put("/:id", async (req, res) => {
  try {
    const remindertoUpdate = validateReminder(req.body);
    remindertoUpdate._id = req.params.id;
    const result = await reminderData.updateReminder(remindertoUpdate);
    console.log(result);
    if (result.matchedCount != 1) {
      res.status(404).send(errors.REMINDER_ENTRY_NOT_FOUND);
    } else {
      res.send(messages.SUCCESSFULL_UPDATE(remindertoUpdate.name));
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

remindersRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await reminderData.deleteReminder(id);
  if (result.deletedCount != 1) {
    res.status(404).send(errors.REMINDER_ENTRY_NOT_FOUND);
  } else {
    res.send(messages.SUCCESSFULL_DELETE);
  }
});

export { remindersRouter };
