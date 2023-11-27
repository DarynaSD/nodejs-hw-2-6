const { nanoid } = require("nanoid");
const { readDB, writeDB } = require("../helpers/pathHelper");

const listContacts = async () => {
  const data = await readDB();
  return data;
};

const getContactById = async (contactId) => {
  const data = await readDB();
  const result = data.find((one) => one.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const data = await readDB();
  const removed = data.find((one) => one.id === contactId) || null;

  if (removed) {
    const result = data.filter((one) => one.id !== removed.id);
    await writeDB(result);
  }
  return removed;
};

const addContact = async (body) => {
  const data = await readDB();
  const newContact = {
    id: nanoid(),
    ...body,
  };

  data.push(newContact);
  await writeDB(data);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await readDB();
  const oldContact = data.find((one) => one.id === contactId);
  if (!oldContact) return null;

  const newContact = {
    contactId,
    ...body,
  };

  const index = data.findIndex(oldContact);
  data[index] = newContact;
  await writeDB(data);

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
