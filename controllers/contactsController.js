const Contact = require("../models/contact.js")

const listContacts = async () => {
  const data = await Contact.find();
  return data;
};

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);

  if (!result) return null;

  return result;
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) return null;

  return result;
};

const addContact = async (body) => {
  const newContact = Contact.create(body)
  return newContact;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(contactId, body);
  if (!result) return null;

  return result;
};

const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(contactId, body);
  if (!result) return null;

  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};