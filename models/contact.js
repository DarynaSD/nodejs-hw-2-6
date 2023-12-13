const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/mongooseError");

// схема
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

// модель (клас, який буде працювати з колекцією contact)
const Contact = model("contact", contactSchema);

// імпортуємо в контролери замість ф-ї роботи з json-ом
module.exports = Contact;
