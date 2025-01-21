import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

console.log("Connecting to DB");

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(`Error connecting to DB: ${error.message}`);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default new mongoose.model("Person", personSchema);