const fs = require("node:fs/promises");
const path = require("node:path");

// const contactsPath = path.join(process.cwd(), "contacts.json");
const contactsPath = path.join(__dirname, "../models/contacts.json");

async function readDB() {
   const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}


async function writeDB(newData) {
  await fs.writeFile(contactsPath, JSON.stringify(newData));
}

module.exports = {readDB, writeDB}