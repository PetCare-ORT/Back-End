import * as calendarData from "../data/calendar.js";
import validator from "validator";
import express from "express";
import { validateCalendarEntry } from "../schemas/calendarSchema.js";
import errors from "../lib/errors.js";
import messages from "../lib/messages.js";
import auth from "../middleware/auth.js";
import jwtDecode from "jwt-decode";


const calendarEntriesRouter = express.Router();

calendarEntriesRouter.use("/:id", (req, res, next) => {
  if (!validator.isMongoId(req.params.id)) {
    res.status(400).send(errors.INVALID_ID);
  } else {
    next();
  }
});

calendarEntriesRouter.get("/",auth, async (req, res) => {
  const jwtInfo = jwtDecode(req.header("Token"));
  const userId = jwtInfo._id;
  const entries = await calendarData.getCalendarEntries(userId);
  res.json(entries);
});

calendarEntriesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const entry = await calendarData.getCalendarEntry(id);
  if (entry == null) {
    res.status(404).send(errors.CALENDAR_ENTRY_NOT_FOUND);
  } else {
    res.json(entry);
  }
});

calendarEntriesRouter.post("/",auth, async (req, res) => {
  try {
    const newCalendarEntry = validateCalendarEntry(req.body);
    const result = await calendarData.addCalendarEntry(newCalendarEntry);
    if (result.acknowledged) {
      res.send(messages.SUCCESSFULL_ADD(newCalendarEntry.name));
    } else {
      res.status(500).send(errors.REQUEST_ERROR);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

calendarEntriesRouter.put("/:id",auth, async (req, res) => {
  try {
    const calendarEntrytoUpdate = validateCalendarEntry(req.body);
    calendarEntrytoUpdate._id = req.params.id;
    const result = await calendarData.updateCalendarEntry(calendarEntrytoUpdate);
    console.log(result);
    if (result.matchedCount != 1) {
      res.status(404).send(errors.CALENDAR_ENTRY_NOT_FOUND);
    } else {
      res.send(messages.SUCCESSFULL_UPDATE(calendarEntrytoUpdate.name));
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

calendarEntriesRouter.delete("/:id",auth, async (req, res) => {
  const id = req.params.id;
  const result = await calendarData.deleteCalendarEntry(id);
  if (result.deletedCount != 1) {
    res.status(404).send(errors.CALENDAR_ENTRY_NOT_FOUND);
  } else {
    res.send(messages.SUCCESSFULL_DELETE);
  }
});

export { calendarEntriesRouter };
