import * as petData from "../data/pet.js";
import validator from "validator";
import express from "express";

const petsRouter = express.Router();

petsRouter.get("/", async (req, res) => {
  const pets = await petData.getPets();
  res.json(pets);
});

petsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  //Pasar a un router.use()
  if (!validator.isMongoId(id)) {
    res.status(400).send("Invalid id");
  }

  const pet = await petData.getPet(id);

  if (pet == null) {
    res.status(404).send("Pet not found");
  } else {
    res.json(pet);
  }
});

petsRouter.post("/", async (req, res) => {
  const newPet = req.body;
  //Pasar a un router.use() con joi
  if (!isPetComplete(newPet)) {
    res.status(400).send("Incorrect body content.");
    return;
  }
  const result = await petData.addPet(newPet);

  if (result.acknowledged) {
    res.send("Pet added succesfully");
  } else {
    //Agregar codigo de error.
    res.send("Error while adding pet");
  }
});

petsRouter.put("/:id", async (req, res) => {
  const petToUpdate = req.body;
  //Pasar a un router.use() con joi
  if (!isPetComplete(petToUpdate)) {
    res.status(400).send("Incorrect body content.");
    return;
  }
  petToUpdate._id = req.params.id;

  const result = await petData.updatePet(petToUpdate);
  console.log(result);
  res.send("ok");
});

//Eliminar, hacer validación con joi
function isPetComplete(pet) {
  return (
    pet.hasOwnProperty("name") &&
    pet.hasOwnProperty("species") &&
    pet.hasOwnProperty("race")
  );
}

//delete/:id
petsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  //Pasar a un router.use()
  if (!validator.isMongoId(id)) {
    res.status(404).send("Invalid id");
    return;
  }

  const result = await petData.deletePet(id);

  if (result.deletedCount != 1) {
    res.status(404).send("Pet not found");
  } else {
    res.send("Pet deleted successfully");
  }
});

export { petsRouter };
