const express = require("express");

// validation func for raw data from frontend
const validateBody = require("../../middlewares/validateBody")

// schema for validation
const { registerSchema } = require("../../joi_validation/user_validation")

// controllers
const ctrl = require("../../controllers/usersController");

const router = express.Router();

// 
// signup
router.post("/register", validateBody(registerSchema), ctrl.register)

module.exports = router;