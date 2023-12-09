const { Schema, model } = require("mongoose")

// схема
const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
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
}, {versionKey: false, timestamps: true})

// модель (клас, який буде працювати з колекцією contact)
const Contact = model("contact", contactSchema)

// імпортуємо в контролери замість ф-ї роботи з json-ом
module.exports = Contact