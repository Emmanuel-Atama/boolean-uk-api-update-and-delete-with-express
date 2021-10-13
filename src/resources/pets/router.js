const express = require("express");

const { createOne, getAll, getOneById, updateOneById, updateOneByName, deleteOneById,  } = require("./controller");

const router = express.Router();

router.post("/", createOne);

router.get("/", getAll);

router.get("/:id", getOneById);

router.put("/:id", updateOneById)

router.patch("/:updateTitle", updateOneByName)

router.delete("/:delete", deleteOneById)

module.exports = router;