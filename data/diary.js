import { ObjectId } from "bson";
import { getConnection } from "./connection.js";
import Constants from "../lib/constants.js";

async function getDiaryEntries() {
  const clientMongo = await getConnection();
  const entries = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.DIARY_ENTRIES_COLLECTION)
    .find()
    .toArray();
  return entries;
}

async function getDiaryEntry(id) {
  const clientMongo = await getConnection();
  const findOneQuery = { _id: new ObjectId(id) };
  const entry = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.DIARY_ENTRIES_COLLECTION)
    .findOne(findOneQuery);
  return entry;
}

async function addDiaryEntry(diaryEntry) {
  const clientMongo = await getConnection();
  const result = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.DIARY_ENTRIES_COLLECTION)
    .insertOne(diaryEntry);
  return result;
}

async function updateDiaryEntry(diaryEntry) {
  const clientMongo = await getConnection();
  const updateQuery = { _id: new ObjectId(diaryEntry._id) };

  const newValues = {
    $set: {
      name: diaryEntry.name,
      description: diaryEntry.description,
      date: diaryEntry.date,
    },
  };

  const result = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.DIARY_ENTRIES_COLLECTION)
    .updateOne(updateQuery, newValues);

  return result;
}

async function deleteDiaryEntry(id) {
  const clientMongo = await getConnection();
  const deleteQuery = { _id: new ObjectId(id) };
  const result = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.DIARY_ENTRIES_COLLECTION)
    .deleteOne(deleteQuery);
  return result;
}

export {
  getDiaryEntries,
  getDiaryEntry,
  addDiaryEntry,
  updateDiaryEntry,
  deleteDiaryEntry,
};
