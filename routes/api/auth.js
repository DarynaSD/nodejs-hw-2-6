const express = require("express");

// validation func for raw data from frontend
const validateBody = require("../../middlewares/validateBody")

// schema for validation
const { registerSchema, loginSchema } = require("../../joi_validation/user_validation")

// controllers
const ctrl = require("../../controllers/usersController");
const isValidToken = require("../../middlewares/isValidToken");

const router = express.Router();

// 
// signup, registration
router.post("/register", validateBody(registerSchema), ctrl.register)

// signin, authorization
router.post("/login", validateBody(loginSchema), ctrl.login)
router.get("/current", isValidToken, ctrl.getCurrent)
router.post("/logout", isValidToken, ctrl.logout)

module.exports = router;