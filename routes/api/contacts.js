const express = require("express");
const HttpError = require("../../helpers/error");

const {
  listContacts,
  getContactById,
  removeContact,
  // addContact,
  // updateContact,
} = require("../../models/contacts");

const router = express.Router();

// get
router.get("/", async (req, res, next) => {
  const result = await listContacts();
  res.json(result);
});

// get by id
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  console.log(result);
  if (!result) {
    res.json(HttpError(404, "Not found"));
  }
  res.json(result);
});

// delete
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  
  if (!result) {
    res.json(HttpError(404, "Not found"));
  }
  res.json({ message: "contact deleted" });
});

// add
router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

// update
router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
