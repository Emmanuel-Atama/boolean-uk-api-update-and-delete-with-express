const express = require("express");

const { createOne, getAll, getOneById, updateOneById, updateOneByTitle, deleteOneById } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.put("/:updateId", updateOneById)

router.patch("/:updateTitle", updateOneByTitle)

router.delete("/:delete", deleteOneById)

module.exports = router;