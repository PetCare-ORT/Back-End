import { ObjectId } from "bson";
import { getConnection } from "./connection.js";
import { DATABASE, REMINDERS_COLLECTION } from "../lib/constants.js"


async function getReminders() {
  const clientMongo = await getConnection();
  const reminders = clientMongo
    .db(DATABASE)
    .collection(REMINDERS_COLLECTION)
    .find()
    .toArray();
  return reminders;
}

async function getReminder(id) {
  const clientMongo = await getConnection();
  const findOneQuery = { _id: new ObjectId(id) };
  const reminder = clientMongo
    .db(DATABASE)
    .collection(REMINDERS_COLLECTION)
    .findOne(findOneQuery);
  return reminder;
}

async function addReminder(reminder) {
  const clientMongo = await getConnection();
  const result = clientMongo
    .db(DATABASE)
    .collection(REMINDERS_COLLECTION)
    .insertOne(reminder);
  return result;
}

async function updateReminder(reminder) {
  const clientMongo = await getConnection();
  const updateQuery = { _id: new ObjectId(pet._id) };

  const newValues = {
    $set: {
      name: reminder.name,  
      alarmDate: reminder.date,
    },
  };

  const result = clientMongo
    .db(DATABASE)
    .collection(REMINDERS_COLLECTION)
    .updateOne(updateQuery, newValues);

  return result;
}

async function deleteReminder(id) {
  const clientMongo = await getConnection();
  const deleteQuery = { _id: new ObjectId(id) };
  const result = clientMongo
    .db(DATABASE)
    .collection(REMINDERS_COLLECTION)
    .deleteOne(deleteQuery);
  return result;
}

export { getReminders, getReminder, addReminder, updateReminder, deleteReminder};
