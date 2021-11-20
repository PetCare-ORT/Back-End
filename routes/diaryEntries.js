import * as diaryData from "../data/diary.js";
import validator from "validator";
import express from "express";
import { validateDiaryEntry } from "../schemas/diarySchema.js";
import errors from "../lib/errors.js";
import messages from "../lib/messages.js";
import auth from "../middleware/auth.js";
import jwtDecode from "jwt-decode";

const diaryEntriesRouter = express.Router();

diaryEntriesRouter.use("/:id", (req, res, next) => {
  if (!validator.isMongoId(req.params.id)) {
    res.status(400).send(errors.INVALID_ID);
  } else {
    next();
  }
});

diaryEntriesRouter.get("/", auth, async (req, res) => {
  try {
    const jwtInfo = jwtDecode(req.header("Token"));
    const userId = jwtInfo._id;
    const diaryEntries = await diaryData.getDiaryEntries(userId);
    res.json(diaryEntries);
  } catch (error) {}
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

diaryEntriesRouter.post("/", auth, async (req, res) => {
  try {
    const jwtInfo = jwtDecode(req.header("Token"));
    const userId = jwtInfo._id;
    const newEntry = validateDiaryEntry(req.body);
    newEntry.userId = userId;
    const result = await diaryData.addDiaryEntry(newEntry);
    if (result.acknowledged) {
      res.send(messages.SUCCESSFULL_ADD(newEntry.name));
    } else {
      res.status(500).send(errors.REQUEST_ERROR);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

petsRouter.put("/:id", auth, async (req, res) => {
  try {
    const updateEntry = validateDiaryEntry(req.body);
    updateEntry._id = req.params.id;
    const result = await diaryData.updateDiaryEntry(updateEntry);
    console.log(result);
    if (result.matchedCount != 1) {
      res.status(404).send(errors.PET_NOT_FOUND);
    } else {
      res.send(messages.SUCCESSFULL_UPDATE(petToUpdate.name));
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
