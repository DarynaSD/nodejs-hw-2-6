// const { nanoid } = require("nanoid");
const fs = require("node:fs/promises");
const path = require("node:path");

// const contactsPath = path.join(process.cwd(), "contacts.json");
const contactsPath = path.join(__dirname, "contacts.json");
// console.log(contactsPath)

async function readDB() {
   const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}


async function writeDB(newData) {
  await fs.writeFile(contactsPath, JSON.stringify(newData));
}

// 

const listContacts = async () => {
  const data = await readDB();
  return data
}

const getContactById = async (contactId) => {
const data = await readDB();
  const result = data.find((one) => one.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
  const data = await readDB();
  const removed = data.find((one) => one.id === contactId) || null;

  if (removed) {
    const result = data.filter((one) => one.id !== removed.id);
    await writeDB(result);
  }
  return removed;
}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
