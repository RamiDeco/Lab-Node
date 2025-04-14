const express = require("express");
const router = express.Router();
const { getUsers, createUser } = require("../controllers/user.controller");

router.get("/", getUsers);
router.get("/create", createUser);

module.exports = router;
