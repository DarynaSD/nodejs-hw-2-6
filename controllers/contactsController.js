const Contact = require("../models/contact.js");

const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpError = require("../helpers/error.js");
const {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../joi_validation/contact_validation.js");

// get all
const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;

  const data = await Contact.find({owner}, "", {skip, limit});
  res.json(data);
};

// get one by id
const getContactById = async (req, res) => {
  console.log(req.params);

  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  console.log(result);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

// delete
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Contact deleted" });
};

// add
const addContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: "Missing required name field" });
  }

  const { _id: owner } = req.user;
  const newContact = await Contact.create({...req.body, owner});
  res.status(201).json(newContact);
};

// update
const updateContact = async (req, res, next) => {
  const { error } = updateSchema.validate(req.body);

  if (error) {
    res.status(400).json(HttpError(400, "Missing fields"));
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    res.status(404).json(HttpError(404, "Not found"));
  }

  res.status(200).json(result);
};


// update favorite
const updateStatusContact = async (req, res, next) => {
 const { error } = updateFavoriteSchema.validate(req.body);

  if (error) {
    res.status(400).json(HttpError(400, "Missing field favorite"));
  }

const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  console.log(result);

  if (!result) {
    res.status(404).json(HttpError(404, "Not found"));
  }

  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
