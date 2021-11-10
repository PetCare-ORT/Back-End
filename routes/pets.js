import * as petData from "../data/pet.js";
import validator from "validator";
import express from "express";
import { validatePet } from "../schemas/petSchema.js";
import errors from "../lib/errors.js";
import messages from "../lib/messages.js";

const petsRouter = express.Router();

petsRouter.use("/:id", (req, res, next) => {
  if (!validator.isMongoId(req.params.id)) {
    res.status(400).send(errors.INVALID_ID);
  } else {
    next();
  }
});

petsRouter.get("/", async (req, res) => {
  const pets = await petData.getPets();
  res.json(pets);
});

petsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const pet = await petData.getPet(id);
  if (pet == null) {
    res.status(404).send(errors.PET_NOT_FOUND);
  } else {
    res.json(pet);
  }
});

petsRouter.post("/", async (req, res) => {
  try {
    const newPet = validatePet(req.body);
    const result = await petData.addPet(newPet);
    if (result.acknowledged) {
      res.send(messages.SUCCESSFULL_ADD(newPet.name));
    } else {
      res.status(500).send(errors.REQUEST_ERROR);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

petsRouter.put("/:id", async (req, res) => {
  try {
    const petToUpdate = validatePet(req.body);
    petToUpdate._id = req.params.id;
    const result = await petData.updatePet(petToUpdate);
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

petsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await petData.deletePet(id);
  if (result.deletedCount != 1) {
    res.status(404).send(errors.PET_NOT_FOUND);
  } else {
    res.send(messages.SUCCESSFULL_DELETE);
  }
});

export { petsRouter };
