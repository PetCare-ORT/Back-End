import * as diaryData from "../data/diary.js";
import validator from "validator";
import express from "express";
import { validateDiaryEntry } from "../schemas/diarySchema.js";
import errors from "../lib/errors.js";
import messages from "../lib/messages.js";

const diaryEntriesRouter = express.Router();

diaryEntriesRouter.use("/:id", (req, res, next) => {
  if (!validator.isMongoId(req.params.id)) {
    res.status(400).send(errors.INVALID_ID);
  } else {
    next();
  }
});

diaryEntriesRouter.get("/", async (req, res) => {
  const entries = await calendarData.getCalendarEntries();
  res.json(entries);
});

diaryEntriesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const entry = await diaryData.getDiaryEntry(id);
  if (entry == null) {
    res.status(404).send(errors.DIARY_ENTRY_NOT_FOUND);
  } else {
    res.json(entry);
  }
});

diaryEntriesRouter.post("/", async (req, res) => {
  try {
    const newDiaryEntry = validateDiaryEntry(req.body);
    const result = await diaryData.addDiaryEntry(newDiaryEntry);
    if (result.acknowledged) {
      res.send(messages.SUCCESSFULL_ADD(newDiaryEntry.name));
    } else {
      res.status(500).send(errors.REQUEST_ERROR);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

diaryEntriesRouter.put("/:id", async (req, res) => {
  try {
    const diaryEntrytoUpdate = validateDiaryEntry(req.body);
    diaryEntrytoUpdate._id = req.params.id;
    const result = await diaryData.updateDiaryEntry(diaryEntrytoUpdate);
    console.log(result);
    if (result.matchedCount != 1) {
      res.status(404).send(errors.DIARY_ENTRY_NOT_FOUND);
    } else {
      res.send(messages.SUCCESSFULL_UPDATE(diaryEntrytoUpdate.name));
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

diaryEntriesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await diaryData.deleteDiaryEntry(id);
  if (result.deletedCount != 1) {
    res.status(404).send(errors.DIARY_ENTRY_NOT_FOUND);
  } else {
    res.send(messages.SUCCESSFULL_DELETE);
  }
});

export { diaryEntriesRouter };
