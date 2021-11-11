import * as userData from "../data/user.js";
import express from "express";
import validator from "validator";
import { validateUser } from "../schemas/userSchema.js";
import messages from "../lib/messages.js";

const usersRouter = express.Router();

usersRouter.use("/:id", (req, res, next) => {
  if (!validator.isMongoId(req.params.id)) {
    res.status(400).send(errors.INVALID_ID);
  } else {
    next();
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const newUser = validateUser(req.body);
    const result = await userData.addUser(newUser);
    if (result.acknowledged) {
      res.send(messages.SUCCESSFULL_USER_CREATED);
    } else {
      res.status(500).send(errors.REQUEST_ERROR);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

usersRouter.post("/login", async (req, res) => {
  try {
    const user = await userData.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await userData.generatedAuthToken(user);

    res.send({ user, token });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

export { usersRouter as usersRouter };
