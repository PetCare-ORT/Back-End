import { ObjectId } from "bson";
import { getConnection } from "./connection.js";
import Constants from "../lib/constants.js";

async function getUserPets(userId) {
  const clientMongo = await getConnection();
  const query = { userId: userId };
  const pets = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.PETS_COLLECTION)
    .find(query)
    .toArray();
  return pets;
}

async function getPet(id) {
  const clientMongo = await getConnection();
  const findOneQuery = { _id: new ObjectId(id) };
  const pet = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.PETS_COLLECTION)
    .findOne(findOneQuery);
  return pet;
}

async function addPet(pet) {
  const clientMongo = await getConnection();
  const result = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.PETS_COLLECTION)
    .insertOne(pet);
  return result;
}

async function updatePet(pet) {
  const clientMongo = await getConnection();
  const updateQuery = { _id: new ObjectId(pet._id) };

  const newValues = {
    $set: {
      name: pet.name,
      species: pet.species,
      race: pet.race,
      birthDate: pet.birthDate,
      gender: pet.gender,
    },
  };

  const result = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.PETS_COLLECTION)
    .updateOne(updateQuery, newValues);

  return result;
}

async function deletePet(id) {
  const clientMongo = await getConnection();
  const deleteQuery = { _id: new ObjectId(id) };
  const result = clientMongo
    .db(Constants.DATABASE)
    .collection(Constants.PETS_COLLECTION)
    .deleteOne(deleteQuery);
  return result;
}

export { getUserPets, getPet, addPet, updatePet, deletePet };
