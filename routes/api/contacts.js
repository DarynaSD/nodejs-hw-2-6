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


const router = express.Router();

// get
router.get("/", listContacts);

// get by id
router.get("/:contactId", getContactById);

// delete
router.delete("/:contactId", isValidId, removeContact);

// add - валідацію body перенесла в контролер, щоб зберегти кастомний меседж
router.post("/", addContact);

// update
router.put("/:contactId", isValidId, updateContact);

// update favorite
router.patch("/:contactId/favorite", isValidId, updateStatusContact)

module.exports = router;
