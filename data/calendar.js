import { ObjectId } from "bson";
import { getConnection } from "./connection.js";
import { DATABASE, CALENDAR_ENTRIES_COLLECTION } from "../lib/constants.js"


async function getCalendarEntries() {
  const clientMongo = await getConnection();
  const entries = clientMongo
    .db(DATABASE)
    .collection(CALENDAR_ENTRIES_COLLECTION)
    .find()
    .toArray();
  return entries;
}

async function getCalendarEntry(id) {
  const clientMongo = await getConnection();
  const findOneQuery = { _id: new ObjectId(id) };
  const entry = clientMongo
    .db(DATABASE)
    .collection(CALENDAR_ENTRIES_COLLECTION)
    .findOne(findOneQuery);
  return entry;
}

async function addCalendarEntry(calendarEntry) {
  const clientMongo = await getConnection();
  const result = clientMongo
    .db(DATABASE)
    .collection(CALENDAR_ENTRIES_COLLECTION)
    .insertOne(calendarEntry);
  return result;
}

async function updateCalendarEntry(calendarEntry) {
  const clientMongo = await getConnection();
  const updateQuery = { _id: new ObjectId(calendarEntry._id) };

  const newValues = {
    $set: {
      name: calendarEntry.name,
      description: calendarEntry.description,
      date: calendarEntry.date,
    },
  };

  const result = clientMongo
    .db(DATABASE)
    .collection(CALENDAR_ENTRIES_COLLECTION)
    .updateOne(updateQuery, newValues);

  return result;
}

async function deleteCalendarEntry(id) {
  const clientMongo = await getConnection();
  const deleteQuery = { _id: new ObjectId(id) };
  const result = clientMongo
    .db(DATABASE)
    .collection(CALENDAR_ENTRIES_COLLECTION)
    .deleteOne(deleteQuery);
  return result;
}

export { getCalendarEntries, getCalendarEntry, addCalendarEntry, updateCalendarEntry, deleteCalendarEntry };
