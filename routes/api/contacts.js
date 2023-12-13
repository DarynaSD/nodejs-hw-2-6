const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsController");

const isValidId = require("../../middlewares/isValidId");
const isValidToken = require("../../middlewares/isValidToken");


const router = express.Router();

// get
router.get("/", isValidToken, listContacts);

// get by id
router.get("/:contactId", isValidToken, isValidId, getContactById);

// delete
router.delete("/:contactId", isValidToken, isValidId, removeContact);

// add - валідацію body перенесла в контролер, щоб зберегти кастомний меседж
router.post("/", isValidToken, addContact);

// update
router.put("/:contactId", isValidToken, isValidId, updateContact);

// update favorite
router.patch("/:contactId/favorite", isValidToken, isValidId, updateStatusContact)

module.exports = router;
