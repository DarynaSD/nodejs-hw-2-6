const express = require("express");
const HttpError = require("../../helpers/error");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contactsController");

const { addSchema, updateSchema } = require("../../helpers/validateBody");

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
    res.status(404).json(HttpError(404, "Not found"));
  }
  res.json(result);
});

// delete
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  if (!result) {
    res.status(404).json(HttpError(404, "Not found"));
  }
  res.json({ message: "contact deleted" });
});

// add
router.post("/", async (req, res, next) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    res.status(400).json(HttpError(400, "Missing required name field"));
  }

  const result = await addContact(req.body);
  res.status(201).json(result);
});

// update
router.put("/:contactId", async (req, res, next) => {
  const { error } = updateSchema.validate(req.body);

  if (error) {
    res.status(400).json(HttpError(400, "Missing fields"));
  }

  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  console.log(result);

  if (!result) {
    res.status(404).json(HttpError(404, "Not found"));
  }

  res.status(200).json(result);
});

module.exports = router;
