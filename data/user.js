import { getConnection } from "./connection.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import errors from "../lib/errors.js";
import Constants from "../lib/constants.js";

async function addUser(user) {
  const connectiondb = await getConnection();
  user.password = await bcrypt.hash(user.password, 8);
  const result = connectiondb
    .db(Constants.DATABASE)
    .collection(Constants.USERS_COLLECTION)
    .insertOne(user);
  return result;
}

async function findByCredentials(email, password) {
  const connectiondb = await getConnection();
  const user = await connectiondb
    .db(Constants.DATABASE)
    .collection(Constants.USERS_COLLECTION)
    .findOne({ email: email });
  if (!user) {
    throw new Error(errors.LOGIN_ERROR);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error(errors.LOGIN_ERROR);
  }

  return user;
}

function generatedAuthToken(user) {
  const token = Jwt.sign(
    { _id: user._id, email: user.email, username: user.username },
    process.env.CLAVE_SECRETA
  );
  return token;
}

export { generatedAuthToken, findByCredentials, addUser };
