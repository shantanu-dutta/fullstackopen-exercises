import mongoose from "mongoose";

const Operation = {
  Get: "Get",
  Add: "Add",
  Invalid: "Invalid",
};

if (process.argv.length < 3) {
  console.log(`
    Please provide the password as an argument.
    Usage: node mongo.js <password>
    `);
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.3v1px.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

let operation;

if (process.argv.length === 3) {
  operation = Operation.Get;
} else if (process.argv.length === 4) {
  console.log(`
    Please provide both the name and number as arguments.
    Usage: node mongo.js <password> <name> <number>
    `);
  process.exit(1);
} else if (process.argv.length === 5) {
  operation = Operation.Add;
} else if (process.argv.length > 5) {
  console.log(`
    Too many arguments.
    Usage: node mongo.js <password> <name> <number>
    `);
  process.exit(1);
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = new mongoose.model("Person", personSchema);

if (operation === Operation.Get) {
  console.log("Phonebook:");

  Person.find({}).then((results) => {
    results.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (operation === Operation.Add) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
