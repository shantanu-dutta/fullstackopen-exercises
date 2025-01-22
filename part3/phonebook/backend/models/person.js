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
  name: {
    type: String,
    minLength: [3, 'User name must be atleast 3 characters.'],
    required: [true, 'User name is required.'],
  },
  number: {
    type: String,
    minLength: [8, 'User phone number must be atleast 8 characters.'],
    required: [true, 'User phone number is required.'],
    validate: {
      validator: v => /^\d{2,3}-\d+$/.test(v),
      message: props => `${props.value} is not a valid phone number!`
    }
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default new mongoose.model("Person", personSchema);
