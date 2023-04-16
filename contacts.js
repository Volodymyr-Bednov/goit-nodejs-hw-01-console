const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/db", "contacts.json");

const getListContacts = async () => {
  const arrResult = await fs.readFile(contactsPath);
  if (!arrResult.length) return null;
  return JSON.parse(arrResult);
};

const getContactById = async (contactId) => {
  const contacts = await getListContacts();
  if (!contacts) return null;
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await getListContacts();
  if (!contacts) return null;
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index == -1) return null;
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await getListContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
};
