import { ObjectId } from "bson";
import { getConnection } from "./connection.js";
import Constants from "../lib/constants.js";

async function getReminders(userId) {
  const clientMongo = await getConnection();
  const query = { userId: userId };
  const reminders = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.REMINDERS_COLLECTION)
    .find(query)
    .toArray();
  return reminders;
}

async function getReminder(id) {
  const clientMongo = await getConnection();
  const findOneQuery = { _id: new ObjectId(id) };
  const reminder = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.REMINDERS_COLLECTION)
    .findOne(findOneQuery);
  return reminder;
}

async function addReminder(reminder) {
  const clientMongo = await getConnection();
  const result = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.REMINDERS_COLLECTION)
    .insertOne(reminder);
  return result;
}

async function updateReminder(reminder) {
  const clientMongo = await getConnection();
  const updateQuery = { _id: new ObjectId(reminder._id) };

  const newValues = {
    $set: {
      name: reminder.name,
      alarmDate: reminder.date,
    },
  };

  const result = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.REMINDERS_COLLECTION)
    .updateOne(updateQuery, newValues);

  return result;
}

async function deleteReminder(id) {
  const clientMongo = await getConnection();
  const deleteQuery = { _id: new ObjectId(id) };
  const result = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.REMINDERS_COLLECTION)
    .deleteOne(deleteQuery);
  return result;
}

export {
  getReminders,
  getReminder,
  addReminder,
  updateReminder,
  deleteReminder,
};
