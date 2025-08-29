const express = require("express");
const router = express.Router();
const { auth, user } = require("../controllers/auth.Controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", auth);
router.get("/user", authMiddleware, user);

module.exports = router;
