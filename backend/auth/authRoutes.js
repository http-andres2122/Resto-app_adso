const express = require("express");
const { login } = require("../auth/authController");

const router = express.Router();

router.post("/login", login);

module.exports = router;
