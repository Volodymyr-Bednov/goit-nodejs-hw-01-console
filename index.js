const contacts = require("./contacts.js");
const { Command } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contacts.getListContacts();
      return console.log(contactsList);
      break;

    case "get":
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);
      break;

    case "add":
      const addContact = await contacts.addContact(name, email, phone);
      return console.log(addContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const program = new Command();

program
  .option(
    "-a, --action <type>",
    "choose action: \n\t\t\t" +
      "list - Get a list of all contactors;\n\t\t\t" +
      "get - Get one contact by id. Use parameter --id <ID number>;\n\t\t\t" +
      "add - Add one contact. Use parameter --name <name> --email <email> --phone <phone>;\n\t\t\t" +
      "remove - Delete contact by id. Use parameter --id <ID number>;"
  )
  .option("-i, --id, <type>", "user id")
  .option("-n, --name, <type>", "user name")
  .option("-e, --email, <type>", "user email")
  .option("-p, --phone, <type>", "user phone");

program.parse();
const option = program.opts();

invokeAction(option);
