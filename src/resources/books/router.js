const express = require("express");

const { createOne, getAll, getOneById, updateOneById, patchOneById, deleteOneById } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.put("/:updateId", updateOneById)

router.patch("/:id", patchOneById)

router.delete("/:delete", deleteOneById)

module.exports = router;